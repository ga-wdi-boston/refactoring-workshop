var Util = {
  display: function(msg){
    $('#message').html(msg);
  },
  showResult: function(data){
    $('#result').val(JSON.stringify(data, null, 4));
  }
};
