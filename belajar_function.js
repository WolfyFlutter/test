let specialAccess = new Array();
let antrianKata = new Array();
let timeKata = 1;
let adminOnly = false;
let suitP1 = ["", ""]
let suitP2 = ["", ""]
let suitBotData = ["", ""]
let suitbotSkor = [[""][0]]
let delayHuruf = 100;

const ta1 = document.querySelector("textarea[aria-label=\"Chat message\"]")
const c1 = document.querySelector("ui-button[aria-label=\"Send message\"]")

function sm(word) {
    ta1.value = word
    c1.click()
    ta1.value = ""
}

function kataFeeder(kata) {
    let kata_split = kata.match(/\S+\s+|\S+$/g);

    if (kata.split(" ")[0] == "__delay") {
        antrianKata.push([parseInt(kata.split(" ")[1]), ""])
        printNumbersWithDelay();
        return;
    }

    let tmp_kata_kecil = ""
    for (let a = 0; a < kata_split.length; a++) {
        //split kata yang lebih dari 72 karakter (kayanya jarang sih)
        if (kata_split[a].length >= 72) {

            if (tmp_kata_kecil.length != 0) { antrianKata.push(tmp_kata_kecil.length < 20 ? 2000 : tmp_kata_kecil.length * delayHuruf, tmp_kata_kecil); tmp_kata_kecil = "" }

            let longWord = kata_split[a];
            //potong kata panjang menjadi 71 karakter dan tambahkan karakter "-" ulangi sampai habis

            //hitung jumlah karakter total termasuk penambahan - baru per baris
            let penambahan_strip = (longWord.length / 72) == 1 ? 0 : Math.floor(longWord.length / 72);

            //hitung jumlah karakter baru
            if (longWord.length == 72) {
                antrianKata.push([tmp_kata_kecil.length < 20 ? 2000 : tmp_kata_kecil.length * delayHuruf, longWord])
            } else {
                let lastRow = Math.ceil((longWord.length + penambahan_strip) / 72);
                for (let a = 0; a < lastRow; a++) {
                    antrianKata.push([tmp_kata_kecil.length < 20 ? 2000 : tmp_kata_kecil.length * delayHuruf, longWord.substring(a * 71, a * 71 + 71) + (a == lastRow - 1 ? "" : "-")]);
                }
            }

        } else {

            if (tmp_kata_kecil.length + kata_split[a].length > 72) {
                antrianKata.push([tmp_kata_kecil.length < 20 ? 2000 : tmp_kata_kecil.length * delayHuruf, tmp_kata_kecil])
                tmp_kata_kecil = ""
                tmp_kata_kecil = kata_split[a]
            } else {
                tmp_kata_kecil = tmp_kata_kecil + kata_split[a]
            }
        }

    }

    if (tmp_kata_kecil.length != 0) {
        antrianKata.push([tmp_kata_kecil.length < 20 ? 2000 : tmp_kata_kecil.length * delayHuruf, tmp_kata_kecil])
    }

    //console.log(antrianKata[0])
    printNumbersWithDelay()


}

let isStillSendingToPT = false

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const printNumbersWithDelay = async () => {
    if (isStillSendingToPT == false) {
        console.log("start looping");
        isStillSendingToPT = true;
        while (antrianKata.length > 0) {
            sm(antrianKata[0][1])
            await delay(antrianKata[0][0]);
            antrianKata.shift()

        }
        isStillSendingToPT = false;
        console.log("alex : antrian kosong bosku...")
    } else {
        console.log("kata di tambahkan dan deque masih berjalan...")
    }

}

let rawChats = document.querySelector(".chat-log-scroll-inner")

const observer = new MutationObserver(mutation => {
    //console.log(mutation[1].addedNodes[0].childNodes[6].childNodes[0].data +"-"+mutation[1].addedNodes[0].childNodes[4].childNodes[1].outerText)
    let word = mutation[1].addedNodes[0].childNodes[6].childNodes[0].data;
    let by = mutation[1].addedNodes[0].childNodes[4].childNodes[1].outerText
    let dup = mutation[1].addedNodes[0].childNodes[4].childNodes[2].childNodes[0].data;


    if (adminOnly) {


        if (specialAccess.includes(by + dup)) {
            command(word, by, dup)
        } else {
            copyLogin(word, by, dup)
        }
    } else {
        command(word, by, dup)
    }
    //console.log(mutation)
})

observer.observe(rawChats, {
    childList: true
})

// function command
function command(word, by, dup) {
    by = by.replace("/", "")
    by = by.replace(":", "")

    if (by == "ganteng" || by == "cantik" || by == "tobrut") { return }

    if (word == ".puja") {
        kataFeeder("wow " + by + " memang hebat banget!!")
    } else if (word == ".about") {
        kataFeeder("halo " + by + ". aku adalah bot simple yang dibuat khusus untuk game PonyTown. aku berjalan di browser laptop dan menggunakan javascript. pembuat ku adalah seorang pemalu.. gitu.. " + by + ". kedepannya owner berharap bisa menambah banyak fitur lebih banyak ^^")
        kataFeeder("/giggle")
    } else if (word == ".cium") {
        sm("/kiss")
    } else if (word == ".duduk") {
        sm("/sit")
    } else if (word == ".baring") {
        sm("/lay")
    }
    else if (word == ".berdiri") {
        sm("/stand")
    }
    else if (word == ".tawa") {
        sm("/giggle")
    }
    else if (word == ".tidur") {
        sm("/sleep")
    }
    else if (word == ".boop") {
        sm("/boop")
    }
    else if (word == ".hadap") {
        sm("/turn")
    }
    else if (word == ".cewek") {
        sm("/swap cantik")
    }
    else if (word == ".cowok") {
        sm("/swap ganteng")
    }
    else if (word == ".devil") {
        kataFeeder("devil adalah antusias bot pertama ketika bot ini baru running pertama kali di bakery... 10 juni 24 16:50")
    }
    else if (word.split(' ')[0] == ".cinta") {
        if (word != ".cinta") {
            kataFeeder("aduh aku cinta banget sama " + word.substr(word.indexOf(" ") + 1) + "!")
        } else {
            kataFeeder("aku cinta kamu... " + by)

        }
    }
    else if (word.split(' ')[0] == ".sayang") {
        if (word != ".sayang") {
            kataFeeder("aku sayang banget sama " + word.substr(word.indexOf(" ") + 1) + "! banget banget banget!")
        } else {
            kataFeeder("aku sayang banget sama " + by + "! banget banget banget!")

        }
    }

    else if (word == ".tobrut") {
        sm("/swap tobrut")
        kataFeeder(by + " memintaku menjadi tobrut.. memang nakal")
    }
    else if (word.split(' ')[0] == ".nbg") {
        let gender = ["I", "Ni"]
        let anakKe = ["Putu", "Kadek", "Komang", "Ketut"]
        let rLastLaki = ["Andika Putra", "Darma Saptura", "Tamara", "Wiguna", "Dwi Kusuna", "Adi Putra"]
        let rLastPerempuan = ["Ayu Putri", "Antari", "Lestari Dewi", "Resmiani", "Dwi Yanti", "Putri"]

        let genderOutput = ""
        let anakKeOutout = ""
        if (word == ".nbg") {
            kataFeeder("nama bali generator. contoh .nbg (L/P) (1/2/3/4..9) (nama kamu)");
        } else {
            let uG = word.split(" ")[1];
            if (uG == "l" || uG == "L" || uG == "p" || uG == "P") {
                if (uG == "l" || uG == "L") {
                    genderOutput = gender[0]
                } else {
                    genderOutput = gender[1]
                }

                uA = word.split(" ")[2]

                if (uA >= 1 && uA < 10) {
                    anakKeOutout = anakKe[((uA - 1) % 4)]
                    if (word.split(" ").length > 3) {
                        let mainName = word.substr(word.indexOf(" ") + 4).replace(/\b[a-z]/g, (x) => x.toUpperCase())
                        if (word.split(" ").length > 4) {
                            kataFeeder(by + ", nama balimu : " + genderOutput + " " + anakKeOutout + "" + mainName)
                        } else {
                            var str = mainName;
                            let totalAscii = 0
                            let randIdx = 0
                            for (var i = 0; i < str.length; i++) {
                                totalAscii += (str[i].charCodeAt(0));
                            }
                            randIdx = (totalAscii - 1) % rLastLaki.length

                            let lastNamePasaran = uG == "l" || uG == "L" ? rLastLaki[randIdx] : rLastPerempuan[randIdx]

                            kataFeeder(by + ", nama balimu : " + genderOutput + " " + anakKeOutout + "" + mainName + " " + lastNamePasaran)

                        }
                    } else {
                        kataFeeder(by + " kurang main name")
                    }

                } else {
                    kataFeeder(by + " format urutan anak kamu salah")

                }

            } else {
                kataFeeder(by + " format gender kamu salah")
            }
        }
    }
    else if (word == ".owner") {
        kataFeeder("owner ku adalah wolpi")
    }
    else if (word == ".minta uang") {
        kataFeeder("selamat " + by + " kamu mendapatkan Rp." + getRandomInt(1, 999) + ".000")
    }
    else if (word == ".telanjang") {
        kataFeeder("duh " + by + " kamu mesum banget!! nyuruh aku telanjang.")
    }
    else if (word == ".terbang") {
        sm("/fly")
    }
    else if (word == ".bersin") {
        sm("/achoo")
    }
    else if (word == ".merem") {
        sm("/e -w-")
    }
    else if (word == ".melotot") {
        sm("/e 0.0")
    }
    else if (word == ".melotot banget") {
        sm("/e OwO")
    }
    else if (word == ".senyum") {
        sm("/e ^^")
    }
    else if (word == ".kunyah") {
        sm("/munch")
    }
    else if (word == ".telen") {
        sm("/eat")
    }
    else if (word == ".buang") {
        sm("/drop")
    }
    else if (word == ".normal") {
        sm("/e")
    }
    else if (word == ".buka") {
        sm("/open")
    }
    else if (word == ".nangis") {
        sm("/cry")
    }
    else if (word == ".malu") {
        sm("/blush")
    }
    else if (word == ".lempar piring") {
        sm("/dropdish")
    }
    else if (word == ".sedih") {
        sm("/e t-t")
    }
    else if (word == ".malu banget") {
        sm("/e >///<")
    }
    else if (word == ".daily kiss") {

    }
    else if (word.split(' ')[0] == ".dailykiss") {
        by = by + dup
        if (specialAccess.includes(by)) {
            if (word != ".dailykiss") {
                repeatTaskKiss(5, 5000, "/kiss", word.substr(word.indexOf(" ") + 1))
            } else {
                repeatTaskKiss(5, 5000, "/kiss", by)
            }

        } else {
            kataFeeder(by + ", .daily kiss hanya untuk user special uwu")
        }

    }
    else if (word == ".daily boop") {
        by = by + dup
        if (specialAccess.includes(by)) {
            repeatTask(5, 1000, "/boop")
        } else {
            kataFeeder(by + ", .daily boop hanya untuk user special uwu")
        }
    }

    else if (word == ".sakit") {
        repeatTask(5, 2000, "/achoo")
    }

    else if (word == ".senam kepala") {
        repeatTask(7, 1000, "/doublenod")
    }

    else if (word == ".geleng") {
        repeatTask(7, 1500, "/no")
    }

    else if (word == ".telanjang") {
        kataFeeder("duh " + by + " kamu mesum banget!! nyuruh aku telanjang.")
        kataFeeder("/mad")
    }
    else if (word.split(' ')[0] == ".goda") {
        by = by + dup
        if (specialAccess.includes(by)) {
            if (word != ".goda") {
                kataFeeder("kiw kiw " + word.substr(word.indexOf(" ") + 1) + " hari ini kamu cakep banget! aku suka deh hehe.. nikah yuk sama aku! besok ya ^^ " + word.substr(word.indexOf(" ") + 1) + "ku sayang!!!")
            } else {
                kataFeeder("kiw kiw " + by + " hari ini kamu cakep banget! aku suka deh hehe.. nikah yuk sama aku! besok ya ^^ " + by + "ku sayang!!!")

            }
        } else {
            kataFeeder(by + ", .goda hanya untuk user special uwu")
        }
    }
    else if (word.split(' ')[0] == ".pamit") {
        if (word != ".pamit") {
            kataFeeder("bye bye... " + word.substr(word.indexOf(" ") + 1))
        } else {
            kataFeeder("bye bye... " + by)

        }
    }
    else if (word.split(' ')[0] == ".wbb") {
        if (word != ".wbb") {
            kataFeeder("selamat datang di pretzelhoof bakery " + word.substr(word.indexOf(" ") + 1) + "!")
        } else {
            kataFeeder("selamat datang di pretzelhoof bakery " + by)

        }
    }

    else if (word.split(' ')[0] == ".wb") {
        if (word != ".wb") {
            kataFeeder("selamat datang " + word.substr(word.indexOf(" ") + 1) + "!")
        } else {
            kataFeeder("selamat datang " + by)

        }
    }
    else if (word.split(' ')[0] == ".s") {

        by = by + dup


        if (specialAccess.includes(by)) {
            if (word.substr(word.indexOf(" ") + 1) == "/unstuck" || word.substr(word.indexOf(" ") + 1) == "/leave") {
                kataFeeder("muahaha kamu gk bisa kick aku " + by)
            } else {
                kataFeeder(word.substr(word.indexOf(" ") + 1))
            }
        } else {
            kataFeeder(by + ": " + word.substr(word.indexOf(" ") + 1))

        }


    }
    else if (word == ".relog") {

        by = by + dup


        if (specialAccess.includes(by)) {
            location.reload();
        } else {
            kataFeeder("sorry " + by + " gak bisa lakukan itu hehe.")

        }


    }
    else if (word == ".cek me") {
        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder("Selamat " + by + " kamu user special! nikmati akses full kontrol.")
        } else {
            kataFeeder("kamu user biasa " + by)
        }
    }
    else if (word == ".cek admin") {
        if (typeof specialAccess == 'undefined' || specialAccess.length == 0) {
            kataFeeder("gk ada punya special access")
        } else {
            kataFeeder("yang punya sepcial access adalah " + specialAccess.join(', '))
        }
    }
    else if (word == ".menu") {
        kataFeeder("hai " + by + " ini menu yang tersedia : .puja .about .cinta .sayang .tobrut .ngb .minta uang .telanjang .goda .pamit .wbb .wb .s .relog .cek me .cek admin .cium .duduk .baring .berdiri .tawa .tidur .boop .cewek .cowok .terbang ")
    } else if (word == ".terima") {
        document.querySelector("div.popover-body button.btn, btn-xs, btn-success, notification-button").click()
    } else if (word == "_wolpiCantik") {
        if (by == "") { kataFeeder("benerin nama nya dulu"); return }

        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder(by + " sudah user special.")
        } else {
            kataFeeder("spesial akses diberikan kepada " + by + "! enjoy")
            specialAccess[0] = by
        }
    }
    else if (word == "_oktaManis") {
        if (by == "") { kataFeeder("benerin nama nya dulu"); return }

        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder(by + " sudah user special.")
        } else {
            kataFeeder("spesial akses diberikan kepada " + by + "! enjoy")
            specialAccess[1] = by
        }
    } else if (word == "_wolep98") {
        if (by == "") { kataFeeder("benerin nama nya dulu"); return }

        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder(by + " sudah user special.")
        } else {
            kataFeeder("spesial akses diberikan kepada " + by + "! enjoy")
            specialAccess[2] = by
        }

    }
    else if (word == "_test") {
        if (by == "") { kataFeeder("benerin nama nya dulu"); return }

        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder(by + " sudah user special.")
        } else {
            kataFeeder("spesial akses diberikan kepada " + by + "! enjoy")
            specialAccess[3] = by
        }

    }
    else if (word == ".admin only") {
        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder("ok...")
            adminOnly = true;
        } else {
            kataFeeder(by + " gak boleh")
        }


    } else if (word == ".public") {
        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder("listen to public")
            adminOnly = false;
        } else {
            kataFeeder(by + " gak boleh")
        }


    } else if (word.split(' ')[0] == ".suit") {
        let filter = "gbk"
        if (word == ".suit") {
            if (suitP1[1] != "") { kataFeeder("p1 : " + suitP1[0]); return }
            kataFeeder(by + ", player 1 kosong. mulai suit dengan ketik .suit g (g/b/k)"); return
        }


        if (suitP1[1] == "") {
            let tangan = word.substr(word.indexOf(" ") + 1);

            if (filter.includes(tangan) && tangan.length == 1) {

                suitP1[0] = by
                suitP1[1] = tangan
                kataFeeder(by + " memulai suit")
                kataFeeder("/nod")
            } else {
                kataFeeder(":x: " + by + " ih.. input yg bener contoh (.suit g) opsi: g,b,k")
                kataFeeder("/no")
            }

        } else {
            let tangan = word.substr(word.indexOf(" ") + 1);
            if (filter.includes(tangan) && tangan.length == 1) {

                suitP2[0] = by
                suitP2[1] = tangan
                kataFeeder(by + " sip, adu time!")
                kataFeeder("/nod")
                kataFeeder("/e sit")
                kataFeeder("/e -w-")
                kataFeeder("/fly")
                let delay = getRandomInt(5, 15);
                kataFeeder("tunggu " + delay + " detik ya...")
                kataFeeder("__delay " + delay * 1000)
                kataFeeder("/sit")


                kataFeeder(suitP1[0] + " [" + suitFormat(suitP1[1], false) + "] vs [" + suitFormat(suitP2[1], true) + "] " + suitP2[0])
                if (suitP1[1] == suitP2[1]) {
                    kataFeeder("hasil seri")
                } else {
                    if ("gkbg".includes(suitP1[1] + suitP2[1])) {
                        kataFeeder(suitP1[0] + " menang!")
                    } else {
                        kataFeeder(suitP2[0] + " menang!")

                    }
                }
                kataFeeder("/giggle")
                kataFeeder("/e")
                kataFeeder("ayo main lagi guys...")

                suitP1 = ["", ""]
                suitP2 = ["", ""]

            } else {
                kataFeeder(":x: " + by + " ih.. input yg bener contoh (.suit g) opsi: g,b,k")
            }
        }




    } else if (word.split(' ')[0] == ".sb") {
        if (word == ".suitbot") { kataFeeder(by + " suit dengan bot. contoh .suitbot g (gunting) opsi g/b/k)"); return }


        let filter = "gbk"
        let tangan = word.substr(word.indexOf(" ") + 1);

        if (filter.includes(tangan) && tangan.length == 1) {
            kataFeeder(by + dup + " menantang ku suit")
            kataFeeder("__delay " + getRandomInt(8, 14) * 1000)

            let dataSuitBot = filter[getRandomInt(0, filter.length)]
            kataFeeder(by + " " + suitFormat(tangan, true) + " vs " + suitFormat(dataSuitBot, true) + " aku")

            if (tangan == dataSuitBot) {
                kataFeeder("hasil seri")
            } else {
                if ("gkbg".includes(tangan + dataSuitBot)) {
                    kataFeeder(by + dup + " menang!")
                    kataFeeder("/giggle")
                } else {
                    kataFeeder("aku menang!")
                    kataFeeder("/happywink")

                }
            }
        } else {
            kataFeeder(by + " command salah. ketik .suitbot g (opsi :g/b/k)")
        }
    }else if (word==".jbb"){
        kataFeeder(by+" meminta jokes bapak-bapak")
        kataFeeder("__delay 2000")
        let jb = listJokesBapakBapak[getRandomInt(0,listJokesBapakBapak.length)]
        jokesBapak(jb[0],jb[1])
    }

}









let repeatTask = async (times, durationPerTimes, command) => {

    console.log("start repeat task");
    while (times > 0) {
        sm(command)
        await delay(durationPerTimes);
        times--;
    }


}

let repeatTaskKiss = async (times, durationPerTimes, command, by) => {

    console.log("start repeat kiss");
    sm("sini sini " + by + " ku beri dirimu kecupan manis")
    await delay(500)
    sm("/e")
    await delay(500)
    sm("/love")
    await delay(500)
    while (times > 0) {
        sm(command)
        await delay(durationPerTimes);
        times--;
    }
    sm("/e")
    await delay(500)
    sm("terima kasih " + by + " aku merasa bergairah lagi uwu")



}

function copyLogin(word, by, dup) {
    if (word == "_wolpiCantik") {
        if (by == "") { kataFeeder("benerin nama nya dulu"); return }

        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder(by + " sudah user special.")
        } else {
            kataFeeder("spesial akses diberikan kepada " + by + "! enjoy")
            specialAccess[0] = by
        }
    }
    else if (word == "_oktaManis") {
        if (by == "") { kataFeeder("benerin nama nya dulu"); return }

        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder(by + " sudah user special.")
        } else {
            kataFeeder("spesial akses diberikan kepada " + by + "! enjoy")
            specialAccess[1] = by
        }
    } else if (word == "_wolep98") {
        if (by == "") { kataFeeder("benerin nama nya dulu"); return }

        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder(by + " sudah user special.")
        } else {
            kataFeeder("spesial akses diberikan kepada " + by + "! enjoy")
            specialAccess[2] = by
        }
    }
    else if (word == "_test") {
        if (by == "") { kataFeeder("benerin nama nya dulu"); return }

        by = by + dup
        if (specialAccess.includes(by)) {
            kataFeeder(by + " sudah user special.")
        } else {
            kataFeeder("spesial akses diberikan kepada " + by + "! enjoy")
            specialAccess[3] = by
        }
    }
}

function suitFormat(data, iconDiKiri) {
    let icon = "";
    if (data == "b") {
        icon = ":stone:"
        data = ""
    } else if (data == "g") {
        icon = ":crossed_swords:"
        data = ""
    } else if (data == "k") {
        icon = ":newspaper_roll:"
        data = ""
    }
    return iconDiKiri ? icon + "" + data : data + "" + icon
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function jokesBapak(soal, jawaban,){
    kataFeeder(soal)
    kataFeeder("__delay " + getRandomInt(4,10)*1000)
    kataFeeder(jawaban)
    kataFeeder("__delay " + getRandomInt(2*1000))
    kataFeeder("/giggle")

}

let listJokesBapakBapak = [["es apa yang bisa bawa orang","Eskalator"], ["Hewan apa yang deket sama teman-temannya?","A crab."], ["Sabun, sabun apa yang paling genit?","Sabun colek dong."], ["Uang 100 ribu kalau dilempar jadi apa hayo?","Jadi rebutan, Pak!"], ["Hewan apa yang ternyata bersaudara?","Katak beradik."], ["Gajah apa yang paling baik hati?","Gajahat."], ["Kenapa air mata warnanya bening?","Kalau hijau namanya air matcha xixixi."], ["Siapa pemain bola yang beratnya 3 kg, Pak?","Bambang tabung gas."], ["Hewan apa yang kalau diinjek nggak marah?","Kera mik."], ["Kesenian apa yang selalu dilakukan oleh nasabah bank, hayo?","Tari tunai."], ["Huruf apa yang paling kedinginan pak?","Huruf B. Karena berada di tengah-tengah AC."], ["Di bolak-balik selalu rusak. Hayo, apa itu?","Kasur. (Kata kasur dibalik terbaca rusak)."], ["Buah, buah apa yang paling receh?","Buah ha ha ha ha ha."], ["Pak, tahu nggak kenapa kucing nggak di penjara pas jadi maling?","Soalnya kucing ga wrong."], ["Pak, tahu nggak kenapa donat tengahnya bolong?","Karena yang utuh cinta saya ke bunda hehehe."], ["Bundaran HI kalau diputerin dua kali jadi apa pak?","Jawaban: HIHI."], ["Kalau kijang sama kuda tabrakan yang mati siapa hayo?","Supirnya."], ["Hantu apa yang bisa dilihat setiap hari pak?","Burung hantu."], ["Pocong apa yang paling jadi favorit ibu-ibu?","Pocongan harga Pak, sudah pasti itu!"], ["Apa persamaan cokelat dan kuburan Pak?","Sama-sama band terkenal, lah!"], ["Hewan apa yang hobi telat ke sekolah?","Kaki seribu. Soalnya kelamaan pakai sepatunya."], ["Hewan apa yang cuma terdiri dari dua huruf?","U dan G (udang)."], ["Kota apa yang banyak bapak-bapaknya?","Purwodaddy."], ["Gendang apa yang nggak bisa dipukul?","Gendang telinga Pak."], ["Warna apa yang paling nggak peduli?","Biru don't care."], ["Kenapa kita harus berdoa sebelum minum air?","Karena di dalam air ada tiga jin. Dua hidroJin dan satu oksiJin."], ["Apa bedanya kamu sama kuburan?","Kalau kuburan nyeremin. Kalau kamu ngeselin."], ["Apa yang kalau dipotong malah makin tinggi?","Celana."], ["Kalau ditutup kelihatan, tapi kalau dibuka malah nggak ada. Apa hayo?","Pintu rel kereta api."], ["Kenapa Superman ada huruf S di bajunya?","Karena kalau pakai M atau XL jadi kegedean."], ["Orang, orang apa yang nggak pernah kebasahan waktu hujan?","Orang nggak hujan, Pak."], ["Kalau dibeli warnanya hitam, kalau dibakar warnanya merah, kalau dibuang warnanya abu-abu, coba tebak apa?","Arang."], ["Lele, lele apa yang bisa terbang pak?","Lelelawar dong."], ["Kenapa burung terbang ke selatan waktu musim dingin?","Karena kalau harus jalan kejauhan."], ["Gerakan apa yang paling susah dilakuin?","Move on."], ["Buah apa yang pernah menjajah Indonesia?","Terong Belanda."], ["Sayur apa yang pintar nyanyi?","Kolplay."]]


