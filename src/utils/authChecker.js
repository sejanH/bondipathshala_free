import axios from "./axios";
const authChecker = async () => {
    const token = localStorage.getItem("STDNTTKN");
    const STDNTID = localStorage.getItem("STDNTID");
    const FORCOURSE = localStorage.getItem("FORCOURSE");
    const openRoutes = ["/", "/login", "/free_exam/before-start", "/free_exam/rules", "/free_exam/ongoing"];
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (!openRoutes.includes(window.location.pathname)) {
        if (!token) {
            return window.location.href = '/';
        } else {
            return await axios.get('/api/student/validate-login')
                .then(({ data }) => {
                    if (data.courseId !== FORCOURSE) {
                        return window.location.href = '/';
                    }
                    if (data.studentId !== STDNTID) {
                        return window.location.href = '/';
                    }
                })
                .catch(err => {
                    console.log(err);
                    return window.location.href = '/login';
                });
            return window.location.href = '/';
        }
    } else {
        if (window.location.pathname == "/login") {
            localStorage.removeItem("STDNTTKN");
            localStorage.removeItem("STDNTID");
            localStorage.removeItem("FORCOURSE");
        }
    }
}

export default authChecker;