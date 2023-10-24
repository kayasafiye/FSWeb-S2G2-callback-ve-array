const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

const final2014 = fifaData.filter(match => {
	return (match.Year === 2014 && match.Stage === 'Final')
})
console.log(final2014)	

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const homeTeamName = final2014[0]["Home Team Goals"];
console.log("Ev Sahibi Takım: " + homeTeamName);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const awayTeamName = final2014[0]["Away Team Name"];
console.log("Deplasman Takım: " + awayTeamName);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const homeTeamGoals = final2014[0]["Home Team Goals"];
console.log("Ev Sahibi Takım Golleri: " + homeTeamGoals);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const awayTeamGoals = final2014[0]["Away Team Goals"];
console.log("Deplasman Takım Golleri: " + awayTeamGoals);

//(e) 2014 Dünya kupası finali kazananı*/
if(final2014[0]["Home Team Goals"] > final2014[0]["Away Team Goals"])
{
	console.log(`Kazanan ${final2014[0]["Home Team Name"]}`);
}
else if(final2014[0]["Home Team Goals"] === final2014[0]["Away Team Goals"])
{
	console.log(final2014[0]["Win conditions"].split("win")[0]);
}
else{
	console.log(`Kazanan ${final2014[0]["Away Team Name"]}`);
}

const uzayanFinaller = fifaData.filter((match) => {
	return(
		match.Stage === 'Final' &&
		match["Home Team Goals"] === match["Away Team Goals"]
	)
});


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
	 // Verilen veri dizisini "Stage" anahtarı "Final" olan nesneleri filtrelemek için kullanıyoruz.
	 return arr.filter((match) => {
	 return	match.Stage === "Final" ;
	});
	 
}
// Finaller fonksiyonunu kullanarak final maçlarını alıyoruz.
console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData, Finaller) {

	// Final maçlarının yıllarını içeren bir dizi oluşturuyoruz.
	const years = Finaller(fifaData).map(match => 
		{
			return match['Year'];
		});
  
	return years;
}
// Yillar fonksiyonunu kullanarak final maçlarının yıllarını alıyoruz.
console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

// Reduce göre:
/*
function Kazananlar(fifaData,Finaller) {
	const kazananlar = Finaller(fifaData).reduce((acc,match) => {
		if(match["Home Team Goals"] > match["Away Team Goals"]){
			acc.push(match["Home Team Name"]);
		}else{
			acc.push(match["Away Team Name"]);
		}
		return acc;
	},[]);
	return kazananlar ;
}
console.log(Kazananlar(fifaData,Finaller));
*/

// Map'e göre:
function Kazananlar(fifaData,Finaller) {
	const kazananlar = Finaller(fifaData).map(match => {
		if(match["Home Team Goals"] > match["Away Team Goals"]){
			return match["Home Team Name"];
		}else{
			return match["Away Team Name"];
		}
	})
	return kazananlar ;
}
console.log(Kazananlar(fifaData,Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {

	const yillar = Yillar (fifaData,Finaller);
	const kazananlar = Kazananlar(fifaData, Finaller)
	const result = [];
	yillar.forEach((yil,index) => {
		const metin = `${yil} yılında, ${kazananlar[index]} dünya kupasını kazandı` ;
		result.push(metin)
	});
	return result;
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
	let toplamGolSayisi = Finaller.reduce(
		(toplamGol, match) => toplamGol + match["Home Team Goals"] + match["Away Team Goals"],0
	);
	return(toplamGolSayisi / Finaller.length).toFixed(2); 
}

console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
