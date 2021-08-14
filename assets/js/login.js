$(function() {
  $("#link_reg").on("click", function() {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  $("#link_login").on("click", function() {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 设置表单验证
  var form = layui.form;

  form.verify({
    // 自定义密码框校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 用户名校验规则
    username: function(value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return "用户名不能有特殊字符";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "用户名不能全为数字";
      }

      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if (value === "xxx") {
        alert("用户名不能为敏感词");
        return true;
      }
    },
    surepwd: function(value) {
      let pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) return "两次密码不一致";
    }
  });

  // 监听注册事件
  $("#reg_form").on("submit", function(e) {
    e.preventDefault();
    let data = {
      username: $("#reg_form [name=username]").val(),
      password: $("#reg_form [name=password]").val(),
      repassword: $("#reg_form [name=surepwd]").val()
    };
    $.post("/api/reg", data, function(res) {
      if (res.code !== 0) {
        return layer.msg(res.message);
      } else {
        layer.msg("注册成功,请登录");
        // 模拟点击
        $("#link_login").click();
      }
    });
  });

  var layer = layui.layer;
  // 监听登录事件
  $("#login_form").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function(res) {
        console.log(res);
        if (res.code !== 0) {
          return layer.msg("登录失败！");
        }
        layer.msg("登录成功！");
        // console.log(res.token);
        location.href = "/index.html";
      }
    });
  });
});
