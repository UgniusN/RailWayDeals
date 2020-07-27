import HTTP from '.'

export default {
    createUser(values,date) {
        let data= new FormData();
        data.append("user",values.user);
        data.append("pass",values.pass);
        data.append("name",values.name);
        data.append("lastname",values.lastname);
        data.append("email",values.email);
        data.append("country",values.country);
        return HTTP.post('http://localhost:8080/api/user/createuser', data);
    }
}