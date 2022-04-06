var awsHelper = require('./awsHelper')

var getSizeDatat = async(formattedText) => {

    //predefined country name
    var conutryData = await awsHelper.findCountryKewords(formattedText)
    var sortedArray = await awsHelper.sortByIndex(conutryData)
    var resultUS = [];
    var resultUK = [];
    var resultF = [];
    var resultD = [];
    var resultJ = [];
    var resultChn = [];
    var resultBR = [];
    var resultCm = [];


    var finalMatch = [];
    var finalMatchData = [];
    var index = await awsHelper.getFirstContryKeword(conutryData.foundedCountryKeyword)
    var updatedFormatedString = await awsHelper.getUpdatedText(formattedText, index);
    //get only numbers 

    var numbers = await awsHelper.getNumbersFromFormttedString(updatedFormatedString)

    //check with number size
    if (sortedArray.length === numbers.length) {
        for (let i = 0; i < sortedArray.length; i++) {
            for (let i = 0; i < numbers.length; i++) {
                sortedArray[i].size = numbers[i]
            }
        }

        resultUS = sortedArray.filter(country => country.countryKeywordD == ' us ');
        resultUK = sortedArray.filter(country => country.countryKeywordD == ' uk ');
        resultF = sortedArray.filter(country => country.countryKeywordD == ' fr ' || country.countryKeywordD == ' f ' || country.countryKeywordD == ' eur ');
        resultD = resultUK
        resultJ = sortedArray.filter(country => country.countryKeywordD == ' jp ' || country.countryKeywordD == ' j ');
        resultChn = sortedArray.filter(country => country.countryKeywordD == ' chn ');
        resultBR = sortedArray.filter(country => country.countryKeywordD == ' br ');
        resultChn = sortedArray.filter(country => country.countryKeywordD == ' cm ');
        finalMatch = [{
            size_us: (typeof resultUS[0] != 'undefined') ? resultUS[0].size : '',
            size_uk: (typeof resultUK[0] != 'undefined') ? (resultUK[0] ? resultUK[0].size : '') : '',
            size_eu: (typeof resultF[0] != 'undefined') ? resultF[0].size : '',
            size_jp: (typeof resultJ[0] != 'undefined') ? resultJ[0].size : '',
            size_d: (typeof resultD[0] != 'undefined') ? resultD[0].size : '',
            size_chn: (typeof resultChn[0] != 'undefined') ? resultChn[0].size : '',
            size_br: (typeof resultBR[0] != 'undefined') ? resultBR[0].size : ''
        }];

    } else {
        var finalMatch = [];
        var filteredArray = [];
        var filteredNumbers = await awsHelper.filterNumberValue(numbers)
        for (let i = 0; i < sortedArray.length; i++) {
            for (let j = 0; j < filteredNumbers.length; j++) {
                filteredArray.push({ countryCode: sortedArray[i], countryKeyword: i, possibleIndex: filteredNumbers[j], filteredNumberIndex: j })
            }
        }

        const sizeUs = await awsHelper.checkSizeDataByUS(filteredArray)
        const sizeUk = await awsHelper.checkSizeDataByUK(filteredArray, sizeUs.size.possibleIndex)

        const sizeF = await awsHelper.checkSizeDataByF(filteredArray)
        const sizeForCJ = await awsHelper.checkSizeDataByJCHn(filteredArray)

        finalMatchData = [{
            size_us: sizeUs.size.possibleIndex,
            size_uk: (sizeUk == undefined) ? '' : (sizeUk.size.possibleIndex || ''),
            size_jp: sizeForCJ.sizeJ,
            size_eu: (sizeF == undefined) ? '' : sizeF.size.possibleIndex,
            size_d: (sizeUk == undefined) ? '' : (sizeUk.size.possibleIndex || ''),
            size_chn: sizeForCJ.sizeChn
        }];



    }
    var data = ((typeof finalMatch[0] != 'undefined') ? finalMatch : finalMatchData)
    return data;

}





var call = async(text) => {
    var formattedText = text.toLowerCase()
    var country = await awsHelper.getMadeIn(text);
    var finalUPC = await awsHelper.getUPCNumber(text)
    var sizeData = await getSizeDatat(formattedText)

    var data = {
        made_in: (country.length > 0) ? country : '',
        size: sizeData,
        upc_number: finalUPC,

    }
    console.log("Data", data)
}

call("MADE IN CHINA US UK FR JP CHN 8% 8 42 265 260 MALE/MÂLE APE 779001 02/15 ART B34292 #111623431 5WM948RX00390 ")
    //  success full

//27
call("NMD_R2 W AQU197 - US 9 Inside 9 1 2 F UK 42 8 1 6 ORIGINALS ORIGINALS UPC POR 119920958 MADE IN VIETINAM FABROQUE AUVIETNAM ")
    //success

//jordan//193
call('12 JORDAN COLLEZIONE - 11  12 UK 11 EUR 46 CM 30 N BR 44 MULTI-COLOR/MULTI-COLOR 89 SCREEN/SCREEN MADE IN CHINA/FABRIQUE EN CHINE/HECHO EN CHINA MADE IN CHINA/FABRIQUE EN CHINE/HECHO EN CHINA 338149 991 JUMPMAN2S.COM ')

//s
//Size [ ' f 42 ', '  uk  8 ' ] 
//Size [ ' f 42 ', '  uk  8 ' ]


//28....  
//call("NMD_R1 AQ1102 - US UK 7 5/2 F D 38 5/2 J CHN 240 235 4 \"059811 998815 ORIGINALS ORIGINALS EAN PO# 119925363 MADE IN VIETNAM FABRIQUÉ AU VIETNAM ABS800YL/0314/V01 ")
//success



//34
//call("T YEEZY BOOST 350 US UK 11 10 AQ2661 LGTSTOJOXFTAN/LGTSTO F D LGTSTO/OXFTAN/LGTSTO 45 10 ORIGINALS ORIGINALS 290 CHN 8 89132 90199 3 280 MADE IN CHINA UPC por 112470422 FABRIQUÉ EN CHINE ABSBOX/0314/V10 ")
// success




//[ ' us 11 ', '  uk  10 ', '  chn  8 ', '  chn  8 ' ]


//52
//call("UltraBOOST W AQ5937 US 5 Inside F UK 36 3 4 8 89765 13955 8 RUNNING COURSE A PIED MADE IN CHINA UPC PO#: 120596235 EN CHINE ")
//Size [ ' f 363 ', '  uk  8 ' ]
//some success

//96
//call("YEEZY 350 CLEAT US B42410 11 CWHITE/CBLACK/GOLDMT BLACRA/NOIESS/ORMETA AMERICAN FOOTB. FOOTBALL AMERIC 8 89135 17413 F UK 8 45 10 MADE IN CHINA FABRIQUE EN CHINE UPC PO# 114018863 ABSBOXUS/0314/V02 ")
//some success    



//129
//call("NMD_R1 W BA7476 - US 9/1 # F UK 42 8 8 89766 16363 7 ORIGINALS ORIGINALS mi COMPATIBLE UPC PO# 114962534 MADE IN VIETNAM FABRIQUÉ, AU VIETNAM ABSBOOYLUS(0414V01 ")

//success

//=========================================jordan
//48
//call("9 AIR JORDAN 12 RETRO BLACK/GYM RED-WHITE NOIR/BLANC/ROUGE GYM MADE IN CHINA/FABRIQUE EN CHINE/ UK 8 HECHO EN CHINA EUR 42 130690 004 cm 27 BR 40.7 JORDAN.COM")
//success

//10
//call("Crazy 97 A US 13 ABSBOXUS/0610/V01 UPC PO# 108813092 BASKETBALL UK 12 1/2 BASKETBALL D 12 1/2 RUNWHTILGTSCA/SOLBLU BLANC/ROU CA/BLESOL F 48 J 310 8 87373 46118 4 MADE IN CHINA FABRIQUÉ EN CHINE G98307 CHN 295 ")
//success
//Size [ '  us  13 ', '  f  48 ', '  j  310', '  chn  295' ]

//1
//call("SUPERSTAR 80v - UNDFTDxBAP US UK 8 8 B34292 FTWWHT/FTWWHT/CWHITE F D kk kk 42 8 ORIGINALS ORIGINALS ] CHN 8 88597 80393 4 265 260 MADE IN CHINA UPC PO# 111623431 FABRIQUE EN CHINE ABSBOX/0314/V10 ")
//success

//129
//call("NMD_R1 W BA7476 - US 9/1 # F UK 42 8 8 89766 16363 7 ORIGINALS ORIGINALS mi COMPATIBLE UPC PO# 114962534 MADE IN VIETNAM FABRIQUÉ, AU VIETNAM ABSBOOYLUS(0414V01 ")


//96
//call("YEEZY 350 CLEAT US B42410 11 CWHITE/CBLACK/GOLDMT BLACRA/NOIESS/ORMETA AMERICAN FOOTB. FOOTBALL AMERIC 8 89135 17413 F UK 4 45 10 MADE IN CHINA FABRIQUE EN CHINE UPC PO# 114018863 ABSBOXUS/0314/V02 ")

//7
//call("EQT RNG SUPPORT 93 - KITH T US 12¹/² UK 12 ABSBOX/1109/V09 UPC PO# 110386480 ORIGINALS ORIGINALS D 12 NINDIG/BRBLUE/WHTVAP F 47¹/² J 305 8 88168 41684 6 MADE IN CHINA CHN 290 FABRIQUÉ EN CHINE B26274 ")

//8
//call("X TRIMM STAR US 12 UK 10 10 B27867 F 23 C 44 10 NOESSIROLCORBLACAS 4 0598098007945 ORIGINALS CHN ORIGINALS 285 275 Wacein vistham ")


//2
//call("DAME4 BAPE US AP9975 R Inside 8 1/2 PANTON/MSILVE/CBLACK 2 PANTON/ARGMAT/NOIESS BASKETBALL BASKETBALL F UK 1 91031 - 81506 7 42 8 MADE IN DHINA UPC POR 119025741 FABRIQUE EN CHINE")

//3
//call("adidas R 668085 ADICOLOR LOW UPC PO# 340086001 D 9 UK 9 EGGPLA/SATELL/BLACK1 EGGPLA/SATELL/BLACK1 F 44 AUBERG/BLEUEL/NOIR1 ORIGINALS US 10 98096 II 37984 1 MADE IN INDONESIA ORIGINALS J 280 ")

//failed to detect right one..

//4
//call("UltraBOOST KOLOR AH1485 US 7 x F UK 40 7 8 89772 70281 3 RUNNING RUNNING/COURSE UPC PO# 116338531 mi COMPATIBLE MADE IN CHINA FABRIQUÉ EN CHINE AISBOOYLUS/0414/V01 ")


//5
//call('NMD_R1 BAPE BA7325 - US UK 9 i F D 43 9 0 CHN 275 265 8 89772 71684 ORIGINALS ORIGINALS mi) COMPATIBLE UPC POR 115519673 VIETNAM FABRIQUE AU VIETNAM ABSBOOYL/0314/V01 ')


//6
//call('668376 THE KOBE MEN UPC 6503 16001 BASKETBALL R.WEISS/SCHWARZ R.BLANC/NOIR R.WHITE/BLACK MADE IN CHINA 098094870272 10 o 10 UK 4 F 11 US 290 J ')
//failed to detect

//9
//call('ultra boost ltd. UNISEX AF5837 RUNNING EAN 0279221124 Me: M*: - COMPATIBLE 055339* 780624° 9 UK 265 (2.5)')

//10
//call('Crazy 97 A US 13 ABSBOXUS/0610/V01 UPC PO# 108813092 BASKETBALL UK 121/2 BASKETBALL D 121/2 RUNWHTILGTSCA/SOLBLU BLANC/ROU CA/BLESOL F 48 J 310 8 87373 46118 4 MADE IN CHINA FABRIQUÉ EN CHINE G98307 CHN 295 ')

//11
//call('D 10 # $ R << ')

//96
//call('YEEZY 350 CLEAT US B42410 11 CWHITE/CBLACK/GOLDMT BLACRA/NOIESS/ORMETA AMERICAN FOOTB. FOOTBALL AMERIC 8 89135 17413 F UK 4 45 10 MADE IN CHINA FABRIQUE EN CHINE UPC PO# 114018863 ABSBOXUS/0314/V02 ')