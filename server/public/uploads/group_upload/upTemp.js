const { response } = require("express");

class BrandHelper {


    async addPowerForPreviousKeyword(predictedNumber) {
        previousPowerNumber = predictedNumber
        return previousPowerNumber
    }

    async isCountryKeyword(fstr, countryKeyword) {

        var dataNoted = false;
        for (var i = 0; i < countryKeyword.length; i++) {
            var ck = countryKeyword[i].trim()
            var dataFound = fstr.localeCompare(ck)
            if (dataFound == 0) dataNoted = true
        }

        return dataNoted;
    }

    stringConcat = async(formattedText, indexData) => {
        var partTwo = formattedText.slice(indexData.endIndex)
        var partOne = formattedText.slice(0, indexData.startIndex)
        var stringConcated = partOne + partTwo
        return stringConcated
    }

    startEndIndex = async(formattedText, keyword) => {
        var found = formattedText.match(keyword)
        var startIndex = found.index
        var endIndex = startIndex + keyword.length
        return { startIndex, endIndex }
    }

    getMadeIn = async(text) => {
        try {
            var madeIn = 'MADE IN ' || 'made in'
            var matchInlen = madeIn.length;
            var found = text.match(madeIn)
            var index = text.indexOf(madeIn)
            var finalMatch = text.slice(index).split(' ')[2] || '';
            var foundedData = finalMatch.split('/')[0];
            return foundedData;
        } catch (err) {

            return err;
        }
    };
    getFirstContryKeword = async(conutryData) => {
        return ((typeof conutryData[0] != 'undefined') ? conutryData[0].indexD : '')

    }
    checkSizeData = async(data, finalMatch) => {
        if (data.countryCode.countryKeywordD == ' us ') {
            if (data.filteredNumberIndex == data.countryKeyword) {
                console.log('data_us', data)
                if (data.possibleIndex.length == 1) {
                    var patt = /[1-9]/
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);
                    }
                } else if (data.possibleIndex.length == 2) {
                    var patt = /1[0-9]/
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);

                    }
                } else if (data.possibleIndex.length == 3) {
                    var checkFordata = data.possibleIndex.includes('/')
                    if (checkFordata == true) {
                        var dataD = data.possibleIndex.slice(0, 1)
                        var patt = /[0-9]/
                        var match = dataD.match(patt);
                        if (match) {
                            data.countryCode.size = data.possibleIndex
                            finalMatch.push(data.countryCode);

                        } else {
                            data.countryCode.size = ''
                            finalMatch.push(data.countryCode);

                        }

                    }
                }
            }
        }
        if (data.countryCode.countryKeywordD == ' uk ') {
            if (data.filteredNumberIndex == data.countryKeyword) {

                if (data.possibleIndex.length == 1) {
                    var patt = /[1-9]/
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);
                    }
                } else if (data.possibleIndex.length == 2) {
                    var patt = /1[0-9]/
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);

                    }
                } else if (data.possibleIndex.length == 3) {
                    var dataD = data.possibleIndex.slice(0, 1)
                    var patt = /[4-9]/
                    var match = dataD.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);

                    }
                }
            }
        }
        if (data.countryCode.countryKeywordD == ' f ') {
            if (data.possibleIndex.length == 2) {

                var patt = /3[0-9]/g
                var match = data.possibleIndex.match(patt);
                if (match) {
                    data.countryCode.size = data.possibleIndex
                    finalMatch.push(data.countryCode);

                } else {
                    var patt = /4[0-9]/g
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);

                    }

                }
            }
            if (data.possibleIndex.length == 3) {
                var dataD = data.possibleIndex.slice(0, 2)
                if (data.possibleIndex.length == 2) {

                    var patt = /3[5-9]/g
                    var match = dataD.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);

                    } else {
                        console.log("data", data)
                        var patt = /4[0-9]/g
                        var match = dataD.match(patt);
                        if (match) {
                            data.countryCode.size = data.possibleIndex
                            finalMatch.push(data.countryCode);

                        }

                    }
                }
            }
        }
        if (data.countryCode.countryKeywordD == ' d ') {
            if (data.filteredNumberIndex == data.countryKeyword) {
                if (data.possibleIndex.length == 1) {
                    var patt = /[1-9]/
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);
                    }
                } else if (data.possibleIndex.length == 2) {
                    var patt = /1[0-9]/
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);

                    } else if (data.possibleIndex.length == 3) {
                        var dataD = data.possibleIndex.slice(0, 1)
                        var patt = /[4-9]/
                        var match = dataD.match(patt);
                        if (match) {
                            data.countryCode.size = data.possibleIndex
                            finalMatch.push(data.countryCode);

                        }
                    }
                } else {
                    var sizeData = await this.getsize(finalMatch)
                    data.countryCode.size = sizeData
                    finalMatch.push(data.countryCode);
                }
            }
        }
        if (data.countryCode.countryKeywordD == ' chn ') {
            if (data.filteredNumberIndex == data.countryKeyword) {
                if (data.possibleIndex.length == 3) {
                    var patt = /2[0-9][0-9]/g
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);

                    }
                }
            }
        }
        if (data.countryCode.countryKeywordD == ' j ' || data.countryCode.countryKeywordD == ' jp ') {
            var posibilities = [];

            if (data.filteredNumberIndex == data.countryKeyword) {
                if (data.possibleIndex.length == 3) {

                    var patt = /2[0-9][0-9]/g
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);
                    } else {
                        var patt = /3[0-9][0-9]/g
                        var match = data.possibleIndex.match(patt);
                        if (match) {
                            data.countryCode.size = data.possibleIndex
                            finalMatch.push(data.countryCode);
                        }
                    }
                }
            } else {
                if (data.possibleIndex.length == 3) {
                    if (!data.possibleIndex.includes('/')) {
                        var patt1 = /3[0-9][0-9]/g
                        var patt2 = /2[0-9][0-9]/g
                        var Mdata = await this.checkForPattern(data.possibleIndex, patt1)
                        if (Mdata) {
                            data.countryCode.size = data.possibleIndex
                            finalMatch.push(data.countryCode);

                        } else {
                            console.log(data.possibleIndex.slice(0, 1))
                            if (data.possibleIndex.slice(0, 1) == 2) {
                                console.log("possible", data.possibleIndex)
                                var Mdata = await this.checkForPattern(data.possibleIndex, patt2)
                                if (Mdata) {
                                    data.countryCode.size = data.possibleIndex
                                    data.countryCode.possiblilites = "new"
                                    finalMatch.push(data.countryCode);
                                }
                            }
                        }

                    }
                }

            }


        }

        if (data.countryCode.countryKeywordD == ' cm ' || data.countryCode.countryKeywordD == ' cm ') {
            console.log("data_cm", data)
            if (data.filteredNumberIndex == data.countryKeyword) {
                if (data.possibleIndex.length == 3) {

                    var patt = /2[0-9][0-9]/g
                    var match = data.possibleIndex.match(patt);
                    if (match) {
                        data.countryCode.size = data.possibleIndex
                        finalMatch.push(data.countryCode);
                    }
                }
            }
        }






    }




    checkSizeDataByUS = async(filteredArray) => {
        const result = filteredArray.filter(country => country.countryCode.countryKeywordD == ' us ');
        if ((typeof result[0] != 'undefined')) {

            var res = result.filter(function(o) {
                // check value is within the range
                // remove `=` if you don't want to include the range boundary
                return o.possibleIndex <= 15 && o.possibleIndex >= 5 || o.possibleIndex.includes('/');
            });

            if ((typeof res[0] != 'undefined')) {
                res[0].countryCode = JSON.stringify(res[0].countryCode)
                const size = res ? filteredArray.find(data => data.possibleIndex == (res[0].possibleIndex)) : "";
                const index = size ? filteredArray.indexOf(size) : "";
                return { res, size, index }

            } else {
                var res = [];
                var size = {}
                size.countryCode = {}
                size.countryCode.countryKeywordD = ' us '
                size.possibleIndex = ''
                var index = ''
                return { res, size, index }
            }


        } else {
            var res = [];
            var size = {}
            size.countryCode = {}
            size.countryCode.countryKeywordD = ' us '
            size.possibleIndex = ''
            var index = ''
            return { res, size, index }
        }

    }

    checkSizeDataByUK = async(filteredArray, usSize) => {
        var sizeUSData = (!(usSize.match('/') == null) == true) ? (usSize.slice(0, usSize.match('/').index)) : usSize
        if (!usSize === '') {
            const result = filteredArray.filter(country => country.countryCode.countryKeywordD == ' uk ');
            if ((typeof result[0] != 'undefined')) {
                var res = result.filter(o => (o.possibleIndex <= sizeUSData + 1 && o.possibleIndex >= sizeUSData - 1 && o.countryKeyword == o.filteredNumberIndex) || (o.possibleIndex.includes('/')));

                if ((typeof res[0] != 'undefined')) {
                    if (res.length > 1) {
                        const resultD = res.filter(data => parseInt(data.possibleIndex) < parseInt(sizeUSData));
                        const size = resultD ? filteredArray.find(data => data.possibleIndex == (resultD[0].possibleIndex)) : "";
                        const index = size ? filteredArray.indexOf(size) : "";
                        return { res, size, index }
                    } else {
                        var res = [];
                        var size = {}
                        size.countryCode = {}
                        size.countryCode.countryKeywordD = ' uk '
                        size.possibleIndex = (parseInt(sizeUSData) - 0.5).toString()
                        var index = ''
                        return { res, size, index }
                    }

                } else {
                    var res = [];
                    var size = {}
                    size.countryCode = {}
                    size.countryCode.countryKeywordD = ' uk '
                    size.possibleIndex = (parseInt(sizeUSData) - 0.5).toString()
                    var index = ''
                    return { res, size, index }
                }
            } else {
                var res = [];
                var size = {}
                size.countryCode = {}
                size.countryCode.countryKeywordD = ' uk '
                size.possibleIndex = (parseInt(sizeUSData) - 0.5).toString()
                var index = ''
                return { res, size, index }
            }

        } else {
            const result = filteredArray.filter(country => country.countryCode.countryKeywordD == ' uk ');
            if ((typeof result[0] != 'undefined')) {
                var res = result.filter(o => (o.possibleIndex <= 15 && o.possibleIndex >= 4 && o.countryKeyword == o.filteredNumberIndex) || (o.possibleIndex.includes('/')));
                if (typeof res[0] !== 'undefined' && typeof res[0] !== undefined && res !== []) {
                    if (res.length > 1) {
                        const resultD = res.filter(data => parseFloat(data.possibleIndex) < 15 && data.possibleIndex > 3);

                        const size = (typeof resultD[0] != 'undefined') ? filteredArray.find(data => data.possibleIndex == (resultD[0].possibleIndex)) : "";
                        const index = size ? filteredArray.indexOf(size) : "";
                        return { res, size, index }
                    } else {
                        var res = [];
                        var size = {}
                        size.countryCode = {}
                        size.countryCode.countryKeywordD = ' uk '
                        size.possibleIndex = (parseInt(sizeUSData) - 0.5).toString()
                        var index = ''
                        return { res, size, index }
                    }
                }
            } else {
                var res = result.filter(o => (o.possibleIndex <= 15 && o.possibleIndex >= 4));
                if ((typeof res[0] != 'undefined')) {
                    res[0].countryCode = JSON.stringify(res[0].countryCode)
                    const size = res ? filteredArray.find(data => data.possibleIndex == (res[0].possibleIndex)) : "";
                    const index = size ? filteredArray.indexOf(size) : "";
                    return { res, size, index }
                } else {
                    var res = [];
                    var size = {}
                    size.countryCode = {}
                    size.countryCode.countryKeywordD = ' uk '
                    size.possibleIndex = ''
                    var index = ''
                    return { res, size, index }
                }

            }

        }

    }
    checkSizeDataByF = async(filteredArray) => {
        const result = filteredArray.filter(country => country.countryCode.countryKeywordD == ' f ' || country.countryCode.countryKeywordD == ' eur ');
        if ((typeof result[0] != 'undefined')) {
            var res = result.filter(function(o) {
                // check value is within the range
                // remove `=` if you don't want to include the range boundary
                return o.possibleIndex <= 50 && o.possibleIndex >= 35 || o.possibleIndex <= 500 && o.possibleIndex >= 300 && o.countryKeyword == o.filteredNumberIndex;
            });
            if ((typeof res[0] != 'undefined')) {
                res[0].countryCode = JSON.stringify(res[0].countryCode)
                const size = res ? filteredArray.find(data => data.possibleIndex == (res[0].possibleIndex)) : "";
                const index = size ? filteredArray.indexOf(size) : "";

                return { res, size, index }
            }
        } else {
            var res = [];
            var size = {}
            size.countryCode = {}
            size.countryCode.countryKeywordD = ' f '
            size.possibleIndex = ''
            var index = ''
            return { res, size, index }
        }
    }
    checkSizeDataByJCHn = async(filteredArray) => {
        const result = filteredArray.filter(country => country.countryCode.countryKeywordD == ' chn ');
        if ((typeof result[0] != undefined)) {
            var res = result.filter(function(o) {
                // check value is within the range
                // remove `=` if you don't want to include the range boundary
                return o.possibleIndex <= 400 && o.possibleIndex >= 200;
            });
            if ((typeof res[0] != undefined)) {

                var sizeChn = Math.min.apply(Math, res.map(function(o) { return o.possibleIndex; })).toString();
                var sizeJ = Math.max.apply(Math, res.map(function(o) { return o.possibleIndex; })).toString();
                return { res, sizeChn, sizeJ }
            }
        } else {
            var res = [];
            var size = ''

            var sizeChn = size
            var sizeJ = size
            return { res, sizeChn, sizeJ }
        }
    }


    getSku = async(formattedText) => {
        var split = formattedText.split(' ');

        let fstrData = [];
        for (let i = 0; i < split.length; i++) {
            var str = split[i];
            if (str.length == 6) {
                const pattern = /[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/;
                var res = pattern.test(str);
                if (res == true) {
                    fstrData.push(str);
                };
            }

        }
        return fstrData;
    }

    getName = async(formattedText) => {
        var split = formattedText.split(' ');
        if (split[0].includes('made')) {

            return ''
        } else {
            if (split[0].length > 2) {

                if ((/[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/.test(split[1])) === true || split[1].includes('-')) {
                    return split[0]

                } else {
                    if ((/[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/.test(split[2])) === true || split[2].includes('-')) {
                        return split[0] + ' ' + split[1]
                    }
                }
                return split[0] + ' ' + split[1] + ' ' + split[2]

            } else {

                if ((/[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/.test(split[2])) == true || split[2].includes('-')) {

                    return split[1]
                } else {
                    if ((/[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/.test(split[3])) == true || split[3].includes('-')) {
                        return split[1] + ' ' + split[2]
                    } else {
                        return split[1] + ' ' + split[2] + ' ' + split[3]
                    }
                }
            }

            // if (split[0].length > 3) {
            //     if ((/[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/.test(split[1])) == false || (/[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/.test(split[2])) == false) {
            //         return split[0]
            //     }

            // } else {
            //     if ((/[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/.test(split[2])) == false || (/[a-z]{2}[0-9]{4}|[a-z]{1}[0-9]{4}/.test(split[3])) == false) {
            //         return split[1] + ' ' + split[2] + ' ' + split[3]
            //     } else {
            //         console.log("data", split[2], split[3]);
            //         return split[1]
            //     }

            // }

        }

    }
    arrayRemove = async(arr, value) => {

        return arr.filter(function(ele) {
            return ele.countryCode.indexD != value[0].countryCode.indexD && ele.possibleIndex != value[0].possibleIndex;
        });
    }
    checkForPattern = async(checkString, pattern) => {
        var match = checkString.match(pattern);
        if (match == null) {

        } else { return checkString }
    }
    getMaxFromArray = async(array) => {
        return Math.max(...array);
    }
    getsize = async(finalMatch) => {
        for (let i = 0; i < finalMatch.length; i++) {
            if (finalMatch[i].countryKeywordD == ' uk ' == true) {
                return finalMatch[i].size;
            }
        }
    }
    getUpdatedText = async(text, index) => {
        return text.slice(index + 1);
    }
    getUPCNumber = async(text) => {
        try {
            var finalMatch;
            var formattedText = text.toLowerCase();
            var matchedData = [];
            var found = [];
            //find by Keywords
            var UpcKeyword = ['#', '#s', 'upc po ', 'upc po# ', 'ean po#', 'ean po ', 'upc por ', 'upc po#: ', 'ean po#: ', 'ean por ', 'UPC PO ', 'UPC PO# ', 'EAN PO# ', 'EAN PO ', 'UPC POR ', 'EAN POR '];
            for (var i = 0; i < UpcKeyword.length; i++) {
                found = formattedText.match(UpcKeyword[i])
                if ((found == null) == false) {
                    var substring = formattedText.substring(found.index + UpcKeyword[i].length)
                    var checkNextChar = substring.charAt(1)
                    var num = parseInt(checkNextChar);
                    var check = Number.isNaN(num)
                    if (check == true) {
                        var newString = substring.replace(checkNextChar, '')
                        return newString
                    }
                    var len = UpcKeyword[i].length
                    var index = formattedText.indexOf(UpcKeyword[i])
                    finalMatch = formattedText.slice(found.index + UpcKeyword[i].length, found.index + UpcKeyword[i].length + 10);
                }



                // if (found) {
                // var substring = formattedText.substring(found.index)
                // var checkNextChar = substring.charAt(1)
                // var num = parseInt(checkNextChar);
                // var check = Number.isNaN(num)
                // if (check == true) {
                //     var newString = substring.replace(checkNextChar, '')
                //     return newString
                //     }


                //     console.log("check", check)

                // var len = UpcKeyword[i].length
                // var index = formattedText.indexOf(UpcKeyword[i])
                // console.log("index", index)
                // finalMatch = formattedText.slice(index, index + len + 10);
                // console.log("index", finalMatch)
                // }
            }

            //  find by length
            if (finalMatch == undefined) {
                var splittedext = formattedText.split(' ')
                splittedext.forEach(element => {
                    if (element.length == 9) {
                        console.log(element);
                        finalMatch = element
                    }
                });




            }
            return (finalMatch) ? finalMatch : '';
        } catch (err) {
            return err;
        }
    };

    findCountryKewords = async(formattedText) => {
        var countryKeyword = [' us ', ' uk ', ' f ', ' fr ', ' br ', ' jp ', ' d ', ' j ', ' chn ', ' eur ', ' cm ']

        var foundedCountryKeyword = [];
        var foundedCountryDigits = 0;

        for (var i = 0; i < countryKeyword.length; i++) {
            let length = countryKeyword[i].length - 1;
            var found = formattedText.match(countryKeyword[i])
            if (found) {
                var countryKeywordD = countryKeyword[i]
                var indexD = found.index
                foundedCountryDigits++;
                foundedCountryKeyword.push({ countryKeywordD, indexD, length })

            }

        }
        return { foundedCountryKeyword, foundedCountryDigits };

    }
    pushDataToArray = async(directData, newDirectData) => {
        for (let index = 0; index < newDirectData.length; index++) {
            const element = newDirectData[index];
            directData.push(element)
        }
        return directData;

    }
    checkIfNumber = async(text) => {
        var num = parseFloat(text);
        var check = Number.isNaN(num)
        return check;

    }
    getNumbersFromFormttedString = async(formattedText) => {
        var split = formattedText.split(' ');

        let fstrData = [];
        for (let i = 0; i < split.length; i++) {
            var str = split[i];
            var isNumber = await this.checkIfNumber(split[i])
            if (isNumber == false) {

                if (split[i].length < 4 || split[i].includes('.')) {
                    if (!(split[i].charAt(0) == '0')) {
                        fstrData.push(split[i])
                    }


                }
            }
        }
        return fstrData
    }
    sortByIndex = async(array) => {
        var indexArray = [];
        var sortedArray = [];
        var arrayData = array.foundedCountryKeyword
        for (let i = 0; i < arrayData.length; i++) {
            indexArray.push(arrayData[i].indexD)
        }
        var sortedIndex = await this.bubbleSort(indexArray)
        for (let i = 0; i < sortedIndex.length; i++) {
            for (let j = 0; j < arrayData.length; j++) {
                if (sortedIndex[i] === arrayData[j].indexD) {
                    var indexD = sortedIndex[i]
                    var countryKeywordD = arrayData[j].countryKeywordD
                    var length = arrayData[j].length
                    sortedArray.push({ indexD, countryKeywordD, length });
                }
            }
        }
        return sortedArray;
    }
    bubbleSort = async(arr) => {
        //Outer pass
        for (let i = 0; i < arr.length; i++) {
            //Inner pass
            for (let j = 0; j < arr.length - i - 1; j++) {
                //Value comparison using ascending order
                if (arr[j + 1] < arr[j]) {
                    //Swapping
                    [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
                }
            }
        };
        return arr;
    };
    filterNumberValue = async(arr) => {
        var array = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > 3 || arr[i].includes('/')) {
                array.push(arr[i])

            }
        }
        return array
    }

    getColor = async(formattedText) => {

        var colors = ['black', 'white', 'red', 'blue', 'violet', 'green', 'yellow', 'green', 'blue', 'gold', 'orange'];
        var color = ''
        for (var i = 0; i < colors.length; i++) {
            var found = formattedText.match(colors[i])
            if (found) {
                console.log("found", found[0]);
                color = color + ',' + found[0];

                console.log("found==============================================", found);


            }


        }
        console.log("color: ", color.slice(1));
        return color.slice(1);
    }
}


module.exports = new BrandHelper();