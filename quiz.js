
	// index.html#matematica

	materia = window.location.href.split("#")[1]
	num = 0

	fetch(materia+'.txt').then(e=>{
		return e.text()
	}).then(e=>{
		textarea = document.createElement("textarea")
		textarea.value = e
		document.body.appendChild(textarea)

		t = textarea.value.split("-----\n")

		for(i of t){
			pergunta = i.split("\n\n")[0]
			enun = i.split("\n\n")[1]
			
			bloquinho(pergunta,enun,num++)
		}

		reajustar()

		textarea.remove()
	})

	function reajustar(){
		bt = document.querySelectorAll("button.checkas")
		for(i of bt){
			i.onclick=function(e){
				this.parentElement.classList.add("active")
			}
		}

		label = document.querySelectorAll("label")
		for(i of label){
			i.onclick=function(e){
				this.parentElement.classList.add("show")
			}
		}

		// bt = document.querySelectorAll("button.comen")
		// for(i of bt){
		// 	i.onclick=function(e){
		// 		this.parentElement.querySelector(".comment").classList.toggle("h0")
		// 	}
		// }
	}


	function bloquinho(pergunta,enun,numero){
	

		comentario = enun
		p1 = comentario.indexOf("[[")
		p2 = comentario.indexOf("]]")
		comentario = comentario.slice(p1+2,p2)

		


		txt2 = enun.split("\n")

		txt3 = txt2.map(e=>{
			if(e.match(/\*{2}/g))
				return "<label class='res'><input type='radio' name='q"+numero+"'><div>"+e.replace(/\*\*/g,"")+"</div></label>"
			else
				return "<label><input type='radio' name='q"+numero+"'><div>"+e+"</div></label>"
		}).join("")

		div = document.createElement('div')
		div.innerHTML = "<div class='pergunta'>"+(numero+1)+") "+pergunta+"</div>"
		div.innerHTML += txt3.replace(/\[\[.+?\]\]/g,"")
		
		comentario = comentario.split("\n").slice(1).join("\n")
		cm = comentario.replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
		
		div.innerHTML += "<button class='checkas'>verificar resposta</button>"

		if(comentario)
			div.innerHTML += "<button class='comen' onclick=\"alertar('"+cm+"')\">Comment</button>"
		// div.innerHTML += "<div class='comment'>"+comentario.replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")+"</div>"

		bloco.appendChild(div)
	}
