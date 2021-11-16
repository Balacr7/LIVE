export function testFirstScreenValidation(line,site,runstart,runend,lineid,partid){
     let firstScreenValidation = (line==="Select Line"||site==="Select Site" || runstart==="Select Run Start Time"|| runend==="Select Run End Time"
              || lineid==="Select Line ID" || partid==="Select Part ID")? false : true;     return firstScreenValidation;
    };

export function testSecondScreenValidation(){
	return true;
}

export function testThirdScreenValidation(){
	return false;
}
export function testFourthScreenValidation(){
	return false;
}
