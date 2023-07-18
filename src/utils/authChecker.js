import axios from "./axios";
const authChecker = async () => {
    const token = sessionStorage.getItem("FREESSTDNTTKN");
    const STDNTID = sessionStorage.getItem("FREESSTDNTID");
    const FORCOURSE = sessionStorage.getItem("FREEEXAMID");
    const openRoutes = ["/", "/before-start", "/rules", "/ongoing"];
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
    }
}

export default authChecker;