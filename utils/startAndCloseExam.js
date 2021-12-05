const examinationModel = require('../model/examinations')

module.exports = async ()=>{
    let examArr = await examinationModel.getAllExaminations()
    if(examArr){
        examArr.forEach(async (item)=>{
            // 若考试尚未开始
            if(item.startTime>Date.now()){
                // 自动开始考试
                const startTimeoutId = setTimeout(async () => {
                    await examinationModel.startExamination(item.examinationId)
                }, item.startTime*1 - Date.now());
                // 自动结束考试
                const closeTimeoutId = setTimeout(async () => {
                    await examinationModel.closeExamination()
                }, item.startTime*1 - Date.now() + 2700000 + 3000);  // 增加三秒延迟
                // 将定时器ID放入examination中
                await examinationModel.setExaminationStartTimeout(item.examinationId,Number(startTimeoutId))
                await examinationModel.setExaminationCloseTimeout(item.examinationId,Number(closeTimeoutId))
            }
            // 若考试已开始，但尚未结束
            else if(item.startTime*1 + 2700000 > Date.now()){
                const closeTimeoutId = setTimeout(async () => {
                    await examinationModel.closeExamination(item.examinationId)
                }, item.startTime*1 - Date.now() + 2700000 + 3000);  // 增加三秒延迟
                // 将定时器ID放入examination中
                await examinationModel.setExaminationCloseTimeout(item.examinationId,Number(closeTimeoutId))
            }
        })
    }
}