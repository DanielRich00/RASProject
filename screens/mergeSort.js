// this is a function for the merge sorter, which can be called at anytime
// within the project, it is primarly used for hashing.
export function mergeSorter(username){
    //these are the different ararys useed for the different
    //stages of the mrege sort, and are empty right now.
    let newUsername = []
    let unsorted = []
    let sorted = []
    let mergerOutput = []
    
    //this pushes the username that is given to the function into
    //the unsorted array
    unsorted.push(username)
    //concat is a way of copy an array in javascript
    //without the need to get rid of the previous array.
    newUsername = unsorted.concat()
    sorted = newUsername.concat()
    
    if(username.length<=1){
        //if username is less than or equal to one, then the array is already sorted
        // so it will just return that
        return(newUsername)
    } else {
        // while the split check is not equal to 0, then it will continue
        while(splitCheck(sorted)!=0){
            // creates a counter and sets it to 0 by default
            let counter = 0
            //iterates through the unsorted aray.
        for(let i = 0; i<unsorted.length; i++){
            //finds the left side of the array
            sorted[counter] = findLeft(unsorted[i])
            counter = counter + 1
            //finds the right side of the array
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


// this is a function that is used to merge the arrays, takes in two paremeters
// the left sub array and right sub array
function merge_Arrays(left_sub_array, right_sub_array) {
    // creates an empty arrau
    let array = []
    while (left_sub_array.length && right_sub_array.length) {
        //if the left sub array is less than the right sub array
       if (left_sub_array[0] < right_sub_array[0]) {
           // then it pushes it onto the array array, shifted.
          array.push(left_sub_array.shift())
       } else {
           // else, it pushes it onto the array, but right shifted.
          array.push(right_sub_array.shift())
       }
    }
    //returns it all joined together.
    return [...array, ...left_sub_array, ...right_sub_array]
}

//this function checks if the newUsername array needs to be split still
function splitCheck(newUsername){
    
// unsorted values is intialised to 0 
    let unsortedValues = 0 
    //itterates though newUsername
    for(let i = 0; i < newUsername.length; i++){
        if (newUsername[i].length>1){
            // if the newUsername length is greater than 1, then the array is not fully split
            // so it incriments unsorted values by one,
            // and the program still needs to continue to split the data up.
            unsortedValues = unsortedValues+1
        } 
    }
    return(unsortedValues)
}

// this function finds the midpoint of the array
function midPoint(array){
    //this splits it by two, and then maths.floor it, so you get a whole number
    let position = Math.floor(array.length/2)
    //returns the position of the mid value
    return(position)
}

//finds the left side of the array
function findLeft(array){
    let x = midPoint(array)
    //slices the aray in the midpoint. x, being the midpoint
    // as mentioned in the previous slide
    let leftSide = array.slice(0, x)
    // returns the left side of the array, to be used in the mergeSort algoithm
    return(leftSide)
}

function findRight(array){
    // this finds the midpoint of the array and stores it in x
    let x = midPoint(array)
    //slices the array in half, at the midpoint to find the rigthside, including the 
    // value at the x position
    let rightSide = array.slice(x, array.length)
    return(rightSide)
}


