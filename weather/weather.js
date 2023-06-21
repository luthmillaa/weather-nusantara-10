function func1() {
  console.log('1: time out')
  setTimeout(function(){}, 5000);
}

function func2() {
  console.log('2: fetch');
  $('#forecast-empty').hide();
  $('#frame-column').css('display', 'flex');
}

function func3() {
  console.log('3: fetch');
  $('#future-empty').hide();
  $('#frame-weather2').css('display', 'flex');
}

func1();
func2();
func3();