// A personality quiz

var S;
var E;

var prompt_values = [{
        value: '快樂/喜悅/愉悅（happiness/joy/amusement）',
        class: 'btn-default',
        weight: 1
    },
    {
        value: '愛/溫柔 (love/tenderness)',
        class: 'btn-default',
        weight: 2
    },
    {
        value: '信任/感激(trust/gratitude)',
        class: 'btn-default',
        weight: 3
    },
    {
        value: '樂觀/自信(optimism/self confidence)',
        class: 'btn-default',
        weight: 4
    },
    {
        value: '悲傷/悲觀(sadness/pessimism)',
        class: 'btn-default',
        weight: 5
    },
    {
        value: '害怕(fear)',
        class: 'btn-default',
        weight: 6
    },
    {
        value: '厭惡(disgust)',
        class: 'btn-default',
        weight: 7
    },
    {
        value: '生氣(anger)',
        class: 'btn-default',
        weight: 8
    },
    {
        value: '落寞/孤單(lost/loneliness)',
        class: 'btn-default',
        weight: 9
    },
    {
        value: '出乎意料(surprise)',
        class: 'btn-default',
        weight: 10
    },
    {
        value: '感動（being moved aesthetically）',
        class: 'btn-default',
        weight: 11
    },
    {
        value: '平靜/和諧（peace/calm）',
        class: 'btn-default',
        weight: 12
    }
]

/*
var prompt_values = [{
        value: '家庭(family)',
        class: 'btn-default',
        weight: 1
    },
    {
        value: '友誼(friendship/couples)',
        class: 'btn-default',
        weight: 2
    },
    {
        value: '冒險(adventure)',
        class: 'btn-default',
        weight: 3
    },
    {
        value: '寫意生活 (enjoy life)',
        class: 'btn-default',
        weight: 4
    },
    {
        value: '美景(beautiful scenery)',
        class: 'btn-default',
        weight: 5
    },
    {
        value: '家/社區(home/community)',
        class: 'btn-default',
        weight: 6
    },
    {
        value: '節慶(holiday/celebration)',
        class: 'btn-default',
        weight: 7
    },
    {
        value: '奇幻(imaginary)',
        class: 'btn-default',
        weight: 8
    },
    {
        value: '懷舊(nostalgia)',
        class: 'btn-default',
        weight: 9
    },
    {
        value: '孤單(loneliness)',
        class: 'btn-default',
        weight: 10
    },
    {
        value: '成長(growth)',
        class: 'btn-default',
        weight: 11
    },
    {
        value: '病痛/死亡（sick/death）',
        class: 'btn-default',
        weight: 12
    }
]
*/

/*
var prompt_values = [{
        value: '古典',
        class: 'btn-default',
        weight: 1
    },
    {
        value: '優美/可愛',
        class: 'btn-default',
        weight: 2
    },
    {
        value: '浪漫/抒情',
        class: 'btn-default',
        weight: 3
    },
    {
        value: '寫實',
        class: 'btn-default',
        weight: 4
    },
    {
        value: '表現主義',
        class: 'btn-default',
        weight: 5
    },
    {
        value: '抽象',
        class: 'btn-default',
        weight: 6
    },
    {
        value: '裝飾圖案',
        class: 'btn-default',
        weight: 7
    },
    {
        value: '奇幻/怪誕(grotesque)',
        class: 'btn-default',
        weight: 8
    },
    {
        value: '幽默/童趣',
        class: 'btn-default',
        weight: 9
    }
]
*/


function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

// Open and First
myFunction()

function myFunction() {
    const myNode = document.getElementById("quiz");
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }
    S = document.getElementById("myStartNumber").value;
    E = document.getElementById("myEndNumber").value;
    document.getElementById("demo").innerHTML = "從第 " + S + " 張開始（含），第 " + E + " 張結束（不含）。";
    createPromptItems(S, E);

    var initial_array = '';
    for (var j = 0; j < prompt_values.length; j++) {
        initial_array = initial_array + '0';
    }
    // Initial 2D Array
    var arr = Array(E - S).fill(initial_array);
    document.getElementById("text-val").value = arr;

    var arr_select = Array(E - S).fill(0);

    // When user clicks a value display to the user what they selected
    $('.value-btn').mousedown(function() {
        var classList = $(this).attr('class');
        var classArr = classList.split(" ");
        var this_group = classArr[0];
        var res = this_group.replace("group", "");
        var this_wight = classArr[1];
        var res_w = this_wight.replace("w", "");

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            arr[res - S] = setCharAt(arr[res - S], res_w - 1, '0');
            arr_select[res - S] -= 1;
        } else {
            $(this).addClass('active');
            arr[res - S] = setCharAt(arr[res - S], res_w - 1, '1');
            arr_select[res - S] += 1;
            if (arr_select[res - S] > 2) {
                $(this).removeClass('active');
                arr[res - S] = setCharAt(arr[res - S], res_w - 1, '0');
                arr_select[res - S] -= 1;
                alert('每張圖只能標注2個標籤，請取消別的標籤再進行選取。');
            }
        }
        document.getElementById("text-val").value = arr;
    })


    // Start file download.
    document.getElementById("dwn-btn").addEventListener("click", function() {

        var select_alert = "";
        var select_alert_num = 0;
        // Check Every Pic
        for (var i = 0; i < arr_select.length; i++) {
            if (arr_select[i] != 2) {
                select_alert += "第" + i + "張，未標記完成。\n";
                select_alert_num += 1;
            }
        }

        if (select_alert_num == 0) {
            // Generate download of hello.txt file with some content
            var text = document.getElementById("text-val").value;
            var filename = '1_' + S + '_' + E + '.txt';
            download(filename, text);
        } else {
            alert(select_alert);
        }

    }, false);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function string_format(str) {
    if (str.length < 5) {
        var k = 5 - str.length;
        for (var i = 0; i < k; i++) {
            str = "0" + str;

        }
    }
    return str;
}

// For each prompt, create a list item to be inserted in the list group
function createImgPromptItems(num) {
    console.log(string_format(num));
    var file_name = ('./suychenmxnthu/' + string_format(num) + '.jpg');
    console.log('file_name:', file_name);
    return file_name;
}

function createPromptItems(start, end) {
    //console.log(start, end);
    start = parseInt(start)
    end = parseInt(end)

    for (var i = start; i < end; i++) {
        console.log(i)
        var prompt_li = document.createElement('li');
        prompt_li.setAttribute('class', 'list-group-item prompt');

        var prompt_p = document.createElement('p');
        var name = '第 ' + i.toString() + ' 張圖:';
        var prompt_text = document.createTextNode(name);
        prompt_p.appendChild(prompt_text);

        var prompt_img = document.createElement('img');
        prompt_img.src = createImgPromptItems(i.toString());
        console.log(i.toString())
        prompt_img.width = "300";

        prompt_li.appendChild(prompt_p);
        prompt_li.appendChild(prompt_img);
        prompt_li.appendChild(document.createElement('p'));
        document.getElementById('quiz').appendChild(prompt_li);


        //var group = document.createElement('div');
        //group.className = 'btn-group btn-group-justified';
        var group;
        var divide_num = 3;

        for (var j = 0; j < prompt_values.length; j++) {

            if (j % divide_num == 0) {
                group = document.createElement('div');
                group.className = 'btn-group btn-group-justified';

            }

            var btn_group = document.createElement('div');
            btn_group.className = 'btn-group';

            var button = document.createElement('button');
            var button_text = document.createTextNode(prompt_values[j].value);
            button.className = 'group' + i + ' w' + prompt_values[j].weight + ' value-btn btn ' + prompt_values[j].class;
            button.appendChild(button_text);

            btn_group.appendChild(button);
            group.appendChild(btn_group);

            if (j % divide_num == 0) {
                document.getElementsByClassName('prompt')[i - start].appendChild(group);
            }
        }
        //document.getElementsByClassName('prompt')[i - start].appendChild(group);

    }
}

//Download
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}