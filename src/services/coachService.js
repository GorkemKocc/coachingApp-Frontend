import axios from "axios"

export default class CoachServis {

    getAllClients(id) {
        return axios.get("http://localhost:8080/coach/getAllClients/" + id)
    }

    getPrograms(id) {
        return axios.get("http://localhost:8080/program/{id}?userId=" + id)
    }
    
    addProgram(program) {
        return axios.post("http://localhost:8080/program/add", program)
    }
    
    updateProgram(program) {
        return axios.put("http://localhost:8080/program/update", program)
    }
    
    getNutritionPlans(id) {
        return axios.get("http://localhost:8080/nutritionPlan/{id}?userId="+ id)
    }
    
    addNutritionPlan(nutritionPlan) {
        return axios.post("http://localhost:8080/nutritionPlan/add", nutritionPlan)
    }
    
    updateNutritionPlan(nutritionPlan) {
        return axios.put("http://localhost:8080/nutritionPlan/update", nutritionPlan)
    }

    getProgressRecord(id) {
        return axios.get("http://localhost:8080/progressRecord/{id}?userId=" + id)
    }
    
}