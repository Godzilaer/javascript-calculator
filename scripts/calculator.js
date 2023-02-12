var answer
var beforeAnswer = 0

const answerTxt = document.getElementById("answer")
const endMark = document.getElementById("endmark")

function solve()
{
	var equation = answerTxt.innerText
	
	if(beforeAnswer > 0)
	{
		return
	}
	
	beforeAnswer = equation + " = "
	
	//Make x multiplication sign readable by function
	equation = equation.replace(/x/g, "*")
	//Make to the power of sign readable by function
	equation = equation.replace(/\^/g, "**")
	
	//Catch error and display it
	try
	{ 
		//Partially remove floating point error and evaluate equation
		answer = Math.round(eval(equation) * 1000000)/1000000
	}
	catch
	{
		answer = "ERR"
		beforeAnswer = ""
	}

	if (answer == "NaN" || answer == "Infinity")
	{
		answer = "Inf"
		beforeAnswer = ""
	}
	
	endMark.style.display = "none"
	answerTxt.innerText = beforeAnswer + answer
	beforeAnswer = beforeAnswer.length
}

function addToEquation(charToAdd)
{
	var txt = answerTxt.innerText
	var addChar = true
	
	//if there is no more space dont allow any more input
	if(txt.length == 23 && charToAdd != "CLEAR" && charToAdd != "CLEARALL" && charToAdd != "√")
	{
		return
	}
	
	//Show end marker
	endMark.style.display = "inline"
	
	//If there is an equal sign remove it
	if(beforeAnswer > 0)
	{
		txt = txt.slice(beforeAnswer, txt.length)
		beforeAnswer = 0
	}
	
	//Replace 0 when there is nothing else
	if(txt == "0" && (!isNaN(charToAdd) || charToAdd == "π" || charToAdd == "-") && charToAdd != "0")
	{
		txt = ""
	}
	
	//Make sure ERR and NaN dont become part of the equation
	if(txt == "ERR" || txt == "NaN")
	{
		txt = ""
	}
	
	//Solve square root
	if(charToAdd == "√")
	{
		beforeAnswer = "√" + txt + " = "
		answerTxt.innerText = beforeAnswer + Math.round(Math.sqrt(txt) * 1000) / 1000
		beforeAnswer = beforeAnswer.length
		endMark.style.display = "none"
		addChar = false
	}
	
	if(charToAdd == "π")
	{
		charToAdd = "3.14"
	}
	
	//Clear all
	if(charToAdd == "CLEARALL")
	{
		answerTxt.innerText = "0"
		addChar = false
	}
	
	//Clear one
	if(charToAdd == "CLEAR")
	{
		if(txt.length > 1)
		{
			answerTxt.innerText = txt.slice(0, txt.length-1)
		}
		else
		{
			answerTxt.innerText = "0"
		}
		addChar = false
	}
	
	if(addChar)
	{
		answerTxt.innerText = txt + charToAdd
	}
}