import axios from "axios"

export default class AdminServis {

    getCoaches() {
        return axios.get("http://localhost:8080/coach/getAll")
    }

    getByCoachId(id) {
        return axios.get("http://localhost:8080/coach/" + id)
    }

    addCoach(coach) {
        return axios.post("http://localhost:8080/coach/add", coach)
    }

    updateCoach(coach) {
        return axios.put("http://localhost:8080/coach/update", coach)
    }

    getUsers() {
        return axios.get("http://localhost:8080/user/getAll")
    }

    getByUserId(id) {
        return axios.get("http://localhost:8080/user/" + id)
    }

    addUser(user) {
        return axios.post("http://localhost:8080/user/add", user)
    }

    updateUser(user) {
        return axios.put("http://localhost:8080/user/update", user)
    }
}