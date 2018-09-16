var password = $('input[name=password]');		
var repassword = $('input[name=repassword]');		
// 失去焦点
repassword.blur(function(){
	if(password.val()==repassword.val()){
		$(this).css('border','1px solid #e6e9e8');
		password.css('border','1px solid #e6e9e8');
	}else{
		$(this).css('border','1px solid red');
		password.css('border','1px solid red');
	}
})

