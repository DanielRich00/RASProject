
export function mergeSorter(username){
    let newUsername = []
    let unsorted = []
    let sorted = []
    let mergerOutput = []

    unsorted.push(username)
    newUsername = unsorted.concat()
    sorted = newUsername.concat()
    
    if(username.length<=1){
        return(newUsername)
    } else {
        while(splitCheck(sorted)!=0){
            let counter = 0
        for(let i = 0; i<unsorted.length; i++){
            sorted[counter] = findLeft(unsorted[i])
            counter = counter + 1
            sorted[counter] = findRight(unsorted[i])
            counter = counter + 1 
             
        }
        unsorted = sorted.concat()
    }

    let lengthChecker = []


    while(unsorted.length!=1){
        let counter2 = 0
        let substring = ""
        let substringArray = []
        for(let i = 0; i < unsorted.length; i= i + 2){
            lengthChecker.push((merge_Arrays([unsorted[i]],[unsorted[i+1]])).sort())
            for(let j = 0; j < lengthChecker[counter2].length; j ++ ){
                substring = substring+lengthChecker[counter2][j]
            }
            mergerOutput.push(substring)
            substring = ""
            counter2 = counter2+1

        }
        unsorted = mergerOutput.concat()
        lengthChecker = []
        mergerOutput = []

        console.log(unsorted)
        }
    }
    return(unsorted)
}

function merge_Arrays(left_sub_array, right_sub_array) {
    let array = []
    while (left_sub_array.length && right_sub_array.length) {
       if (left_sub_array[0] < right_sub_array[0]) {
          array.push(left_sub_array.shift())
       } else {
          array.push(right_sub_array.shift())
       }
    }
    return [...array, ...left_sub_array, ...right_sub_array]
}

function splitCheck(newUsername){
    

    let unsortedValues = 0 
    for(let i = 0; i < newUsername.length; i++){
        if (newUsername[i].length>1){
            unsortedValues = unsortedValues+1
        } 
    }
    return(unsortedValues)
}

function midPoint(array){
    let position = Math.floor(array.length/2)
    return(position)
}

function findLeft(array){
    let x = midPoint(array)
    let leftSide = array.slice(0, x)
    return(leftSide)
}

function findRight(array){
    let x = midPoint(array)
    let rightSide = array.slice(x, array.length)
    return(rightSide)
}


