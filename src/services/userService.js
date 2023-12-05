import axios from "axios"

export default class UserServis {

    getPrograms(id) {
        return axios.get("http://localhost:8080/program/{id}?userId=" + id)
    }

    getNutritionPlans(id) {
        return axios.get("http://localhost:8080/nutritionPlan/{id}?userId="+ id)
    }

    getProgressRecords(id) {
        return axios.get("http://localhost:8080/progressRecord/{id}?userId="+ id)
    }

    addProgressRecord(progressRecord) {
        return axios.post("http://localhost:8080/progressRecord/add", progressRecord)
    }
    updateProgressRecord(progressRecord) {
        return axios.put("http://localhost:8080/progressRecord/update", progressRecord)
    }
}