var normbereichHash = {
    "with_potassium"     : "7\u201415 mmol/L",
    "without_potassium"  : "3\u201411 mmol/L"
};

document.addEventListener('DOMContentLoaded', function() {

    var $sodiumValue      = document.querySelector('.f2_sodium-input');
    var $potassiumValue   = document.querySelector('.f2_potassium-input');
    var $chlorideValue    = document.querySelector('.f2_chloride-input');
    var $bicarbonateValue = document.querySelector('.f2_bicarbonate-input');
    var $outputValue      = document.querySelector('.f2_anion-output');
    var $outputNormValues = document.querySelector('.f2_norm-values'); 

    //Array based on inputs, NOT including the OPTIONAL POTASSIUM input
    var inputArray = [$sodiumValue, $chlorideValue, $bicarbonateValue];

    //Reset button
    document.querySelector('.f2_btn-reset').addEventListener('click', function(event) {

	//Stop form input submission
	event.preventDefault();

	//Reset inputs and outputs
	for (var i=0; i<inputArray.length; i++){
	    inputArray[i].value='';
	    inputArray[i].classList.remove('f2_input__error');
	}
	$potassiumValue.classList.remove('f2_input__error');
	$potassiumValue.value='';
	$outputValue.value='';
	$outputNormValues.value  = '';	
    });
    
    //Calculate button
    document.querySelector('.f2_btn-calc').addEventListener('click', function(event) {
	
	//Stop form input submission
	event.preventDefault();
	
	//Reset all ouput values before calculating
	$outputValue.value  = '';	
	$outputNormValues.value  = '';	
	for (var i=0; i<inputArray.length; i++){
	    inputArray[i].classList.remove('f2_input__error');
	    $potassiumValue.classList.remove('f2_input__error');
	}

	//Array of inputs for Formula
	var formulaArray= [];

	//Create number obj based on input and make sure it is indeed a number
	//If all checks are good, add to formulaArray inputs 
	for (i=0; i<inputArray.length; i++){
	    var num = createNumCommaAndPoint(inputArray[i].value);
	    if (!validateNum(num)){
		inputArray[i].classList.add('f2_input__error');
		return;
	    }
	    else{
		formulaArray.push(num);
	    }
	}

	//Check optional Potassium Input
	var potassiumNum = createNumCommaAndPoint($potassiumValue.value);
	if(!validateNumWithEmptyString(potassiumNum)){
	    $potassiumValue.classList.add('f2_input__error');
	    return;
	}

	
	//Calculate Formula
	$outputValue.value = "Anionenluecke: " + calculateFormula(formulaArray[0], potassiumNum, formulaArray[1], formulaArray[2]) + " mmol/L";

	if (potassiumNum != "" && potassiumNum != '0'){
	    $outputNormValues.innerHTML = "Norm: " + normbereichHash['with_potassium'];	
	}
	else{	    
	    $outputNormValues.innerHTML = "Norm: " + normbereichHash['without_potassium'];	
	}
	    
    });
});

/**
 * Aniongap Formulas
 * @param  {number} input1 - First parameter should be sodium Value
 * @param {number} input2 - Second parameter should be potassium Value
 * @param {number} input3 - Second parameter should be chloride Value
 * @param {number} input4 - Second parameter should be bicarbonate Value
 * @return {number} Calculated value
 */

function calculateFormula(input1, input2, input3, input4){ 	
    return (input1 + input2) - (input3 + input4);
}

