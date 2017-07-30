var Visualizer = function() {
	this.file = null //要处理的文件
	this.fileName = null //要处理的文件的名字
	this.audioContext = null//对音频处理的上下文（环境）
	this.source = null //保存音频
	this._prepareAPI()
}

Visualizer.prototype = {
	_prepareAPI: function () {
		window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
	    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
	    try {
	    	this.audioContext = new window.AudioContext() 
	    } catch (e) {
	    	console.log("error:" + e)
	    }
	},
	_addEventListener: function () {
		var that = this
		var audioInput = document.getElementById('uploadedFile')
		var dropContainer  = document.getElementById('canvas')
		audioInput.onchange = function () {
			if(this.files.length !== 0) {
				that.file = this.files[0]
				that.fileName = that.file.name
				that._start() //获取文件之后开始程序
			}
		}
	},
	_start: function() {
	   var that = this
	   var file = this.file
	   var fr = new FileReader()
	   fr.readAsArrayBuffer(file)//将获取到的文件传递给FileReader进而转成ArrayBuffer格式
	   fr.onload = function(e) {//转换完成调用此函数
	   	var fileResult = e.target.result//成功读取的ArrayBuffer数据
	   	var audioContext = that.audioContext
	   	audioContext.decodeAudioData(fileResult, function (buffer) {//1.解码函数 2.回调
            that._visualizer(audioContext, buffer)//对音频数据进行频谱分析
	   	}, function (e) {
	   		console.log("error:" + e)
	   	})
	   }
	},
	_visualizer: function (audioContext, buffer) {
      var audioBufferSouceNode = audioContext.createBufferSource()
      var analyser = audioContext.createAnalyser()
      audioBufferSouceNode.buffer = buffer//将数据传递给BufferSouce属性 audioBufferSouceNode可以打印出来看看
      audioBufferSouceNode.connect(analyser)//与频谱分析器连接
      analyser.connect(audioContext.destination)//与'扬声器'连接起来,才可以听到声音
      audioBufferSouceNode.start(0)//0代表播放开始的时间
      this._drawSpectrum(analyser)
	},
	_drawSpectrum: function(analyser) {
      var canvas = document.getElementById('canvas'),
		  cwidth = canvas.width,
		  cheight = canvas.height - 2,
		  meterWidth = 5, //能量条的宽度
		  gap = 2, //能量条间的间距
		  capHeight = 2,
		  meterNum = 800 / (10 + 2), //计算当前画布上能画多少条
		  ctx = canvas.getContext('2d'),
		  capYPositionArray = [],
		  capStyle = '#fff';
//定义一个渐变样式用于画图
		  gradient = ctx.createLinearGradient(0, 0, 0, 300);
		  gradient.addColorStop(1, '#0f0');
		  gradient.addColorStop(0.5, '#ff0');
		  gradient.addColorStop(0, '#f00');
		  ctx.fillStyle = gradient;

			var drawMeter = function() {
			    var array = new Uint8Array(analyser.frequencyBinCount);
			    analyser.getByteFrequencyData(array);
			    var step = Math.round(array.length / meterNum); //计算采样步长(时间)
			    ctx.clearRect(0, 0, cwidth, cheight); //清理画布准备画画
			    for (var i = 0; i < meterNum; i++) {
			        var value = array[i * step];
			        if(capYPositionArray.length < Math.round(meterNum)) {
			        	capYPositionArray.push(value)
			        }
			        ctx.fillStyle = capStyle
			        if(value < capYPositionArray[i]) {
			        	console.log(capYPositionArray[i],--capYPositionArray[i])
			         ctx.fillRect(i * 12 , cheight - (--capYPositionArray[i]) + capHeight, meterWidth, capHeight);
			        } else {
			         ctx.fillRect(i * 12 , cheight - value + capHeight, meterWidth, capHeight);
			         capYPositionArray[i] = value
			        }
		          ctx.fillStyle = gradient;
			        ctx.fillRect(i * 12 /*频谱条的宽度+条间间距*/ , cheight - value + capHeight, meterWidth, cheight);
			    }
			    requestAnimationFrame(drawMeter);
			}
			requestAnimationFrame(drawMeter);
	}

}
var p1 = new Visualizer()._addEventListener()