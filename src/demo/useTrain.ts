import { useBizTable, useFormModal, useMessage } from "vue-components-hooks";
import { TrainingService } from "@/api/services/Examinations/training";
import { dateToMoment, dateToString, momentToNumber, numberToDay, numberToTime } from "@/utils";
import { computed, onMounted, reactive, ref, unref, watch } from "vue";
import moment from "moment";
import { bizStore } from "@/store/modules/biz";
import { WatchStopHandle } from "@vue/runtime-core";
import { message } from "ant-design-vue";
import { ExaminationService } from "@/api/services/Examinations/examination";
import { FindTrainingReply } from "@/api/protobuf/Examinations/training_pb";

export function useTrainTable() {
  const search = reactive<any>({});
  const [registerTable, tableMethods] = useBizTable({
    bordered: true,
    columnsAlign: "center",
    columns: [
      { title: "培训内容", slots: { customRender: "name" } },
      { title: "培训企业", dataIndex: "enterpriseName" },
      { title: "开始时间", width: 92, dataIndex: "startDateDesc" },
      { title: "结束时间", width: 92, dataIndex: "endDateDesc" },
      { title: "补考", width: 60, dataIndex: "retakeCount" },
      { title: "信息不全", width: 80, dataIndex: "incompleteCount" },
      { title: "通过", width: 60, dataIndex: "passedCount" },
      { title: "总数", width: 60, dataIndex: "traineeCount" },
      { title: "通过率", width: 70, dataIndex: "passedRate" },
      { title: "考试状态", width: 75, slots: { customRender: "exam" } },
      { title: "培训状态", width: 90, slots: { customRender: "train" } },
      { title: "操作", width: 290, slots: { customRender: "actions" }, fixed: "right" },
    ],
    rowSelection: {},
    queryFunc: (i) =>
      TrainingService.query({
        ...search,
        ...i,
        startDate: search.startDate ? momentToNumber(search.startDate) : 0,
        endDate: search.endDate ? momentToNumber(search.endDate) : 0,
        orderRequest: {
          orderBy: "startDate",
          descending: true,
        },
      }),
    queryFuncMap: (i: FindTrainingReply.AsObject) => ({
      ...i,
      enterpriseName: i.enterprise?.name,
      startDateDesc: dateToString(i.startDate),
      endDateDesc: dateToString(i.endDate),
      retakeCount: i.status > 1 ? i.retakeCount : "-",
      examination: i.examination ?? {},
      examStatusDesc: i.examination ? ["待审核", "已审核", "已结束"][i.examination?.status] : "-",
      trainStatusDesc: ["未关联考试", "已关联考试", "待发布成绩", "已发布成绩"][i.status],
    }),
    removeFunc: (idsList: string[]) =>
      TrainingService.remove({ idsList }).then((reply) => {
        //将删除的失败原因告诉用户
        if (reply.failsList.length > 0) {
          reply.failsList.forEach((fail) => {
            message.error(fail);
          });
          return false;
        }
      }),
    removeTitle: "培训",
    removeLabelFunc: (i: FindTrainingReply.AsObject) => i.name,
  });
  return {
    search,
    registerTable,
    rePageChange: tableMethods.rePageChange,
    removeItem: tableMethods.removeItemAuto,
    removeItems: tableMethods.removeItemsAuto,
  };
}

export function useTrainForm(rePageChange: () => Promise<void>) {
  const watchEvent = ref<WatchStopHandle | undefined>();
  onMounted(() => {
    bizStore.getEnterprise();
    bizStore.getSubject();
  });
  const enterpriseList = computed(() => bizStore.enterpriseList);
  const subjectList = computed(() => bizStore.subjectList);
  const [registerForm, mModal] = useFormModal({
    title: "培训",
    rules: {
      subjectId: [{ required: true, message: "请选择科目" }],
      enterpriseId: [{ required: true, message: "请选择企业" }],
      dateArr: [{ required: true, type: "array", message: "请选择培训时间" }],
    },
    pageChange: rePageChange,
    col: [8, 16],
    commonMap(model: any) {
      return {
        enterpriseName: enterpriseList.value.find((i) => i.value === model.enterpriseId)?.label,
        startDate: momentToNumber(model.dateArr[0]),
        endDate: momentToNumber(model.dateArr[1]),
      };
    },
    async onAdd(model: any) {
      await TrainingService.create(model);
      watchEvent.value && watchEvent.value();
    },
    onCancel: () => watchEvent.value && watchEvent.value(),
    onEdit: (model: any) => TrainingService.update(model),
    async openAddModal() {
      await mModal.openNew({
        dateArr: [moment(), moment().add(7, "day")],
        type: 0,
        subjectId: subjectList.value[0]?.value,
        enterpriseId: enterpriseList.value[0]?.value,
      });
      getNo();
    },
    async openEditModal(record: any) {
      await mModal.openEdit({
        ...record,
        subjectId: record.subject.id,
        enterpriseId: record.enterprise.id,
        dateArr: [dateToMoment(record.startDate), dateToMoment(record.endDate)],
      });
    },
  });
  function getNo() {
    watchEvent.value = watch(
      () => {
        const { subjectId, enterpriseId } = unref(mModal.getModelRef());
        return { subjectId, enterpriseId };
      },
      async (val) => {
        if (val.subjectId && val.enterpriseId) {
          const res = await TrainingService.getMaxNo(val);
          mModal.setModel({ no: res.maxNo + 1, noMin: res.maxNo + 1 });
        }
      },
      {
        immediate: true,
      }
    );
  }
  return {
    openAddModal: mModal.openAddModal,
    openEditModal: mModal.openEditModal,
    registerForm,
    enterpriseList,
    subjectList,
  };
}

export function useTrainExamApply(rePageChange: () => Promise<void>) {
  function getOptions() {
    bizStore.getEnterprise();
    bizStore.getSubject();
    bizStore.getTranList();
  }

  const orgIdRef = ref<string>("");

  const trainList = computed(() => {
    let res = bizStore.trainList;
    if (orgIdRef.value) {
      res = bizStore.trainList.filter((i) => i.enterprise?.id === orgIdRef.value);
    }
    return res.filter((i) => !i.examination);
  });

  const [registerExamApply, method] = useFormModal({
    title: "考试申请",
    rules: {
      subjectId: [{ required: true, message: "请选择科目" }],
      enterpriseId: [{ required: true, message: "请选择企业" }],
      address: [{ required: true, message: "请填写考试地点" }],
      timeArr: [{ required: true, type: "array", message: "请填写时间" }],
    },
    col: [8, 16],
    pageChange: rePageChange,
    addMap(i: any) {
      const startTime = moment(i.timeArr[0]).set("hour", 10).set("m", 0);
      return {
        startTime: momentToNumber(startTime),
        endTime: momentToNumber(startTime.add(60, "m")),
      };
    },
    onAdd: (model) => ExaminationService.apply(model),
    async openAddModal(record: any) {
      if (record.traineeCount === "-" && record.incompleteCount === "-") {
        return message.error("请创建培训学员补全信息，再申请考试！");
      }
      if (record.traineeCount && record.incompleteCount > 0) {
        return message.error("请补全学员信息再申请考试!");
      }
      getOptions();
      console.log(
        moment(record.endDate > Date.now() ? moment(record.endDate).add(1, "d") : moment()).format(
          "YYYY-MM-DD hh:mm:ss"
        )
      );
      await method.openNew({
        subjectId: record.subject.id,
        enterpriseId: record.enterprise.id,
        trainingId: record.id,
        name: record.name,
        device: 0,
        startMin:
          record.endDate > Date.now() ? moment(record.endDate).add(1, "d") : moment().set("h", 0).set("m", 0),
      });
    },
  });

  // 机构选择后触发
  function orgChange(orgId: string) {
    orgIdRef.value = orgId;
    method.setModel({
      subjectId: "",
      trainingId: "",
    });
  }
  // 培训选择后触发
  function trainChange(trainId: string) {
    if (trainId) {
      const curTrain = trainList.value.find((i) => i.id === trainId);
      if (curTrain && curTrain.enterprise) {
        orgIdRef.value = curTrain.enterprise.id;
        method.setModel({
          orgId: curTrain.enterprise.id,
          subjectId: curTrain.subject?.id,
        });
      }
    }
  }

  return {
    registerExamApply,
    openExamModal: method.openAddModal,
    examWay: [
      { value: 0, label: "上机考试" },
      { value: 1, label: "手机考试" },
    ],
    disabledDate(current: moment.Moment) {
      const { startMin } = method.getModelRef().value;
      return current && current < startMin;
    },
    trainList,
    orgChange,
    trainChange,
  };
}

export function useTraineePublish(rePageChange: () => Promise<void>) {
  const { createMessage, createConfirm } = useMessage();

  const [registerPublish, pubMethods] = useFormModal({
    col: [4, 20],
    rules: {
      startTime: [{ required: true, message: "请选择证书开始时间" }],
    },
    async onOk() {
      try {
        await pubScore(pubMethods.getModelRef().value?.id, pubMethods.getModelRef().value);
      } catch (e) {
        console.log(e);
        pubMethods.modal.closeLoading();
      }
      await rePageChange();
    },
  });

  function showPeopleInfo(arr: string[] = [], length = 3) {
    return (
      arr.slice(0, length).join(",") + (arr.length > length ? `等 ${arr.length} 人` : ` ${arr.length} 人`)
    );
  }
  async function getTrainee(id: string) {
    const res = await TrainingService.queryTrainee({
      trainingId: id,
      name: "",
      male: 0,
      passed: 1,
      hasPhoto: 2,
      hasMobilePhone: 1,
    });
    return res.itemsList.map((i) => i.name);
  }
  async function checkTraineePhoto(id: string) {
    const trainee = await getTrainee(id);
    const names = showPeopleInfo(trainee);
    return new Promise((resolve, reject) => {
      if (trainee.length) {
        createConfirm({
          iconType: "warning",
          title: "发布成绩",
          content: `${names}合格但没有照片，将不能生成证书，请检查照片`,
          okType: "danger",
          okText: "继续发布",
          onOk() {
            resolve({});
          },
          onCancel() {
            reject({});
          },
        });
      } else {
        resolve({});
      }
    });
  }

  async function pubScore(id: string, modelRef: any) {
    await checkTraineePhoto(id);
    await TrainingService.publishScore({
      trainingId: id,
      certificateStartDate: momentToNumber(modelRef.startTime),
      certificateEndDate: momentToNumber(moment(modelRef.startTime).add(1, "y").subtract(1, "d")),
    });
    createMessage.success("发布成功!");
  }

  return {
    registerPublish,
    openViewPublish(record: FindTrainingReply.AsObject) {
      const { examination } = record;
      let examTime = "";
      if (examination) {
        examTime =
          numberToDay(examination.startTime) +
          " " +
          numberToTime(examination.startTime) +
          " ~ " +
          numberToTime(examination.endTime);
      }
      pubMethods.openEdit({
        ...record,
        examTime,
        startTime: moment(),
        subjectName: record.subject?.name,
      });
    },
  };
}
