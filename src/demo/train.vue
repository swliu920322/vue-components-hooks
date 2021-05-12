<template>
  <div class="h100 w100 flex-column">
    <TrainSearch
      :search="search"
      @search="rePageChange"
      :enterpriseList="enterpriseList"
      @add="openAddModal"
      @remove="removeItems"
    />
    <div class="flex-1 mt20 over-hidden">
      <BizTable @register="registerTable">
        <template #name="{ record }">
          <router-link :to="`/train/trainee?id=${record.id}`">{{ record.name }}</router-link>
        </template>
        <template #exam="{ record }">
          {{ record.examStatusDesc }}
        </template>
        <template #train="{ record }">
          <span :class="[record.trainStatusDesc !== '未关联考试' ? 'item-active' : 'item-disable']">
            {{ record.trainStatusDesc }}
          </span>
        </template>
        <template v-slot:actions="{ record }">
          <IconButton
            link
            icon
            edit
            :title="record.status !== 0 ? '已申请的考试不能修改信息' : ''"
            :disabled="record.status !== 0"
            @click="() => openEditModal(record)"
          >
            编辑
          </IconButton>
          <IconButton link icon remove :disabled="record.status !== 0" @click="() => removeItem(record)">
            删除
          </IconButton>
          <IconButton link icon upload @click="() => openImport(record.id)">导入</IconButton>
          <IconButton link icon detail @click="() => toDetail(record.id)">详情</IconButton>
          <div>
            <IconButton link icon add :disabled="record.status !== 0" @click="() => applyExam(record)">
              申请考试
            </IconButton>
            <IconButton
              link
              icon
              publish
              :disabled="record.status !== 2"
              @click="() => openViewPublish(record)"
            >
              发布成绩
            </IconButton>
            <IconButton link icon download @click="() => exportTemplate(record)">导出</IconButton>
          </div>
          <IconButton link icon reset :disabled="record.status !== 2" @click="() => updateScore(record.id)">
            更新成绩
          </IconButton>
          <IconButton link icon print :disabled="record.status !== 3" @click="() => print(record)">
            打印证书
          </IconButton>
        </template>
      </BizTable>
    </div>
    <!--    培训编辑-->
    <FormModal :width="650" class="half-form" @register="registerForm">
      <template v-slot:form="{ model, isAdd }">
        <TrainEdit
          :subjectList="subjectList"
          :isAdd="isAdd"
          :enterpriseList="enterpriseList"
          :model="model"
        />
      </template>
    </FormModal>
    <UploadTrainee ref="uploadRef" />
    <PrintDialog ref="printRef" />
    <!--    申请考试-->
    <FormModal class="half-form" @register="registerExamApply">
      <template v-slot:form="{ model }">
        <ExamApply
          :subjectList="subjectList"
          :enterpriseList="enterpriseList"
          :trainList="trainList"
          :examWay="examWay"
          :orgChange="orgChange"
          :disabledDate="disabledDate"
          :model="model"
        />
      </template>
    </FormModal>
    <!--    证书发布-->
    <FormModal :width="600" title="成绩发布" @register="registerPublish">
      <template v-slot:form="{ model }">
        <TrainPublish :model="model" />
      </template>
    </FormModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useRouter } from "vue-router";
  import TrainSearch from "./components/train-search.vue";
  import TrainEdit from "./components/train-edit.vue";
  import UploadTrainee from "./components/upload-trainee.vue";
  import PrintDialog from "./components/print-dialog.vue";
  import { BizTable, FormModal, IconButton, useMessage } from "vue-components-hooks";
  import { useTraineePublish, useTrainExamApply, useTrainForm, useTrainTable } from "./useTrain";
  import { dateToString } from "@/utils";
  import useTraineeExport from "./trainee/hooks/useTraineeExport";
  import usePrint from "./trainee/hooks/usePrint";
  import { TrainingService } from "@/api/services/Examinations/training";
  import ExamApply from "@/views/system/train/components/exam-apply.vue";
  import TrainPublish from "@/views/system/train/components/train-publish.vue";

  export default defineComponent({
    name: "train",
    components: {
      TrainPublish,
      ExamApply,
      PrintDialog,
      UploadTrainee,
      IconButton,
      BizTable,
      TrainEdit,
      FormModal,
      TrainSearch,
    },
    setup() {
      const trainTable = useTrainTable();
      const trainForm = useTrainForm(trainTable.rePageChange);
      const examApplyForm = useTrainExamApply(trainTable.rePageChange);
      const traineePublish = useTraineePublish(trainTable.rePageChange);

      const router = useRouter();
      function toDetail(id: string) {
        router.push("/train/trainee?id=" + id);
      }

      const uploadRef = ref<any>();
      function openImport(trainingId: string) {
        uploadRef.value?.openModal(trainingId);
      }

      async function exportTemplate(record: any) {
        const { exportTrainee } = useTraineeExport({
          ...record,
          trainDate: dateToString(record.startDate) + " ~ " + dateToString(record.endDate),
        });
        await exportTrainee();
      }

      const printRef = ref();
      function print(record: any) {
        const { openPrint } = usePrint(printRef.value?.openPrint, record.subject.id, record.id);
        openPrint();
      }

      const examCheckRef = ref();
      function applyExam(record: any) {
        examApplyForm.openExamModal({
          ...record,
        });
      }

      async function updateScore(id: string) {
        const { createMessage } = useMessage();
        await TrainingService.syncExaminationScore({ id });
        createMessage.success("成绩更新成功!");
        await trainTable.rePageChange();
      }
      return {
        ...trainTable,
        ...trainForm,
        ...examApplyForm,
        ...traineePublish,
        uploadRef,
        toDetail,
        openImport,
        exportTemplate,
        printRef,
        print,
        examCheckRef,
        applyExam,
        updateScore,
      };
    },
  });
</script>

<style>
  .item-active {
    color: #67c23a;
  }
  .item-disable {
    color: #f56c6c;
  }
</style>
