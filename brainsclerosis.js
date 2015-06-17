var swapsyntax = 1;

var op1="!";
var op2=">";
var op3="<";
var op4="+";
var op5="-";
var op6=".";
var op7=",";
var op8="[";
var op9="]";

function interpret()
{
	var memory = new Array();
	var ptr = 0;
	var ptrmax = 0;
	for ( var i = 0; i < 5000; i++ )
		memory[i] = 0;
	var src = document.getElementById("source").value;
	var out = document.getElementById("output");
	var dbg = document.getElementById("debug");
	out.value = "";
	dbg.value = "";
	for ( var i = 0; i < src.length; i++ )
	{
		if ( src[i] == op1 )
			ptr = 0;
		if ( src[i] == op2 )
		{
			if ( ptr < 5000 )
			{
				ptr++;
				if ( ptr > ptrmax )
					ptrmax = ptr;
			}
			else
				ptr = 0;
		}
		if ( src[i] == op3 )
		{
			if ( ptr > 0 )
				ptr--;
			else
				ptr = 5000;
		}
		if ( src[i] == op4 )
		{
			if ( memory[ptr] != 255 )
				memory[ptr]++;
			else
				memory[ptr] = 0;
		}
		if ( src[i] == op5 )
		{
			if ( memory[ptr] != 0 )
				memory[ptr]--;
			else
				memory[ptr] = 255;
		}
		if ( src[i] == op6 )
			out.value += String.fromCharCode(memory[ptr]);
		if ( src[i] == op7 )
		{
			var input = window.prompt("Enter ASCII code in demimal, \
				0 for break:", "");
			if ( input == 0 )
				break;
			if ( input > 255 || input < 0 )
				input = 0;
			memory[ptr] = input;
		}
		if ( src[i] == op8 )
			if ( memory[ptr] == 0 )
			{
				var count = 1;
				for ( var j = i + 1; j < src.length; j++ )
				{
					if ( src[j] == op8 )
						count++;
					if ( src[j] == op9 )
						count--;
					if ( count == 0 )
					{
						i = j;
						break;
					}
				}
				continue;
			}
		if ( src[i] == op9 )
			if ( memory[ptr] != 0 )
			{
				var count = 1;
				for ( var k = i - 1; k > 0; k-- )
				{
					if ( src[k] == op9 )
						count++;
					if ( src[k] == op8 )
						count--;
					if ( count == 0 )
					{
						i = k;
						break;
					}
				}
			}
	}
	dbg.value += "Pointer at cell #" + ( ptr + 1 );
	dbg.value += "\n";
	for ( var d = 0; d < ptrmax + 1; d++ )
	{
		dbg.value += "Cell #" + ( d + 1 ) + ": ";
		dbg.value += memory[d];
		dbg.value += "\n";
	}
}

function switchLanguage()
{
	swapsyntax++;
	if ( swapsyntax % 2 == 0 )
	{
		op1="ORG";
		op2="MOPUP";
		op3="MOVDN";
		op4="INC";
		op5="DEC";
		op6="OUT";
		op7="IN";
		op8="LOOP";
		op9="END";
	}
	else
	{
		op1="!";
		op2=">";
		op3="<";
		op4="+";
		op5="-";
		op6=".";
	 	op7=",";
		op8="[";
		op9="]";
	}
}

function reset()
{
	document.getElementById("source").value = "";
}