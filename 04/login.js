//密码111111
function getCode() {
    let email = document.getElementById("registeremail").value;
    console.log(email);
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://120.24.93.68:8085/api/register/sendCheckCode?email="+email,true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.response);
        let code = document.getElementById("code");
        let response_message = JSON.parse(xhr.response);
        let real_code = response_message.data;
        let wait_code = prompt("请输入验证码");
        let tip = document.getElementById("tip");
        if(real_code!==wait_code) {
            alert("验证码错误")
        }else{
            tip.innerHTML="验证码正确，请输入密码";
            code.value = wait_code;
        }
    }
}

function register() {
    let checkcode = document.getElementById("code").value;
    let email = document.getElementById("registeremail").value;
    let password = document.getElementById("registerpassword").value;
    let register_info = {
        "checkCode": checkcode,
        "email": email,
        "password": password
    }
    console.log(register_info);
    let xhr = new XMLHttpRequest();
    xhr.open("POST","http://120.24.93.68:8085/api/user/register",true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(register_info));
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        }else{
            alert(xhr.response);
        }
    }
}
function updatePwd() {
    let checkcode = document.getElementById("code").value;
    let email = document.getElementById("registeremail").value;
    let password = document.getElementById("registerpassword").value;
    let update_info = {
        "checkCode": checkcode,
        "email": email,
        "password": password
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST","http://120.24.93.68:8085/api/updatePassword",true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(update_info));
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Error ${xhr.status}`+xhr.response);
            console.log(xhr.response)
        }else{
            alert(JSON.parse(xhr.response).message);
        }
    }
}
function loginAjax() {
    let email = document.getElementById("email").value;
    let password_self = document.getElementById("password");
    let password = password_self.value;
    let info = {
        "email":email,
        "password":password
    };
    console.log(info);
    let xhr = new XMLHttpRequest();
    xhr.open("POST","http://120.24.93.68:8085/api/login",true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(info));
    xhr.onload = function() {
        if (xhr.status !== 200) { // 分析响应的 HTTP 状态
            alert(`Error ${xhr.status}: ${xhr.statusText}`); // 例如 404: Not Found
            password_self.value = "";
        } else { // 显示结果
            let message = JSON.parse(xhr.response);
           // alert(message.message);
            alert(message.message);

            if (message.message==="成功") {
                window.location.href = "index.html";
            }

        }
    };
}
