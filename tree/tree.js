
function organiza(a,b){

	an = parseInt(a.getAttribute('pos'))
	bn = parseInt(b.getAttribute('pos'))

	if(a.querySelector('ul') == null){
		ul2 = document.createElement('ul')
		a.appendChild(ul2)
	}

	if(an < bn)
		ul2.appendChild(b)

}

function render(str){	
	valor = str



	//renderiza
	ul = document.createElement("ul")
	for(i of valor.split("\n")){
		pos = i.split("\t").length
		li = "<li pos='"+pos+"'><span class='tf-nc'>"+i.replace(/\t/g,"")+"</span></li>"
		ul.innerHTML += li
	}

	//chama a função para organizar
	for(i=ul.childElementCount; i>=0;i--){
		try{
			for(j=0;j<20;j++)
				organiza(ul.children[i],ul.children[i+1])
		}catch(e){}
	}

	//apagar vazio
	for(j of ul.querySelectorAll('ul')){
		if(j.innerHTML == "")
			j.remove()
	}


	return  ul
}

function render2(){
	Tree = document.querySelectorAll(".tree")
	for(j of Tree){

		div = j
		div.classList.add('tf-tree')
		div.classList.add('monospace')

		z = []
		j.innerHTML.split('\n\n\n').map(e=>{
			z.push(render(e))
		})

		div.innerHTML = ""
		z.forEach(e=>{
			div.appendChild(e)
		})
	}

	document.body.innerHTML = document.body.innerHTML.replace(/\[\[(.*?)#(.*?)\]\]/g,"<span class='blue' onclick=\"alertar('$2')\">$1</span>").replace(/;/g,"<br>")
}

render2()
