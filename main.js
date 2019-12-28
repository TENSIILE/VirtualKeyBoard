let lang = null;
if(localStorage.getItem('lang') == 'en'){lang = 'en';}
else{localStorage.setItem('lang','ru');lang = 'ru';}

const letter = [
    ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
    ['Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','Delete'],
    ['CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter'],
    ['Shift','я','ч','с','м','и','т','ь','б','ю','.','⬆','Shift'],
    ['Ctrl','Win','Alt',' ','Alt ','⬅','⬇','➡','Ctrl']
]
const letterEnglish = [
    ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Delete'],
    ['CapsLock','a','s','d','f','g','h','j','k','l',';',"'",'Enter'],
    ['Shift','z','x','c','v','b','n','m',',','.','/','⬆','Shift'],
    ['Ctrl','Win','Alt',' ','Alt ','⬅','⬇','➡','Ctrl']
]
const special_characters     = ['!','"','№',';','%',':','?','*','(',')','_','+']
const special_characters_eng = ['!','@','#','$','%','^','&','*','(',')','_','+']

let wrapper  = document.createElement('div');
let text     = document.createElement('textarea');
let keyboard = document.createElement('div');

document.body.insertBefore(wrapper,document.body.firstChild);
wrapper.appendChild(text);
wrapper.appendChild(keyboard);

wrapper.classList.add('wrapper');
text.classList.add('text');
keyboard.classList.add('keyboard');
text.setAttribute('autofocus','autofocus');

for(let i = 0; i < letter.length; i++)
{
    let row = document.createElement('div');
    row.classList.add('row');
    keyboard.appendChild(row);
}

let row = document.querySelectorAll('.row');
let leftSide = true;

for(let i = 0; i < letter.length; i++)
{
    for(let key of letter[i])
    {
        let button       = document.createElement('button');
        button.innerHTML = key;

        if( button.innerHTML == "Backspace" ||
            button.innerHTML == "Tab"       ||
            button.innerHTML == "Enter"     ||
            button.innerHTML == "Shift"     ||
            button.innerHTML == " ")
            button.classList.add('key');

        button.classList.add('btn');

        if(button.innerHTML == 'Shift' && leftSide)
        {
            button.classList.add('ShiftLeft');
            leftSide = false;
        }
        else
        {
            if(button.innerHTML == 'Shift')
            {
                button.classList.add('ShiftRight');
                button.classList.add('width-px');
                leftSide = true;
            }
        }
        
        if(button.innerHTML == 'Ctrl' && leftSide)
        {
            button.classList.add('ControlLeft');
        }
        else
        {
            if(button.innerHTML == 'Ctrl')button.classList.add('ControlRight');
        }

        if(button.innerHTML == 'Win')button.classList.add('Win');
        if(button.innerHTML == '⬆')  button.classList.add('ArrowUp');
        if(button.innerHTML == '⬅') button.classList.add('ArrowLeft');
        if(button.innerHTML == '⬇')  button.classList.add('ArrowDown');
        if(button.innerHTML == '➡') button.classList.add('ArrowRight');
        if(button.innerHTML == 'CapsLock')button.classList.add('CapsLock');

        if(button.innerHTML == 'Alt' && leftSide)
        {
            button.classList.add('AltLeft');
            leftSide = false;
        }
        else
        {
            if(button.innerHTML == 'Alt '){button.classList.add('AltRight');}
        }

        if(button.innerHTML != 'Tab'      &&
        button.innerHTML != 'CapsLock' &&
        button.innerHTML != 'Shift'    &&
        button.innerHTML != 'Ctrl'     &&
        button.innerHTML != 'Alt'      &&
        button.innerHTML != 'Alt '     &&
        button.innerHTML != 'Win'      &&
        button.innerHTML != 'Enter'    &&
        button.innerHTML != 'Delete'   &&
        button.innerHTML != 'Backspace')
        button.classList.add('character');

        if(button.innerHTML  == '1'  ||
            button.innerHTML == '2'  ||
            button.innerHTML == '3'  ||
            button.innerHTML == '4'  ||
            button.innerHTML == '5'  ||
            button.innerHTML == '6'  ||
            button.innerHTML == '7'  ||
            button.innerHTML == '8'  ||
            button.innerHTML == '9'  ||
            button.innerHTML == '0'  ||
            button.innerHTML == '-'  || 
            button.innerHTML == '=')
        button.classList.add('number');

        row[i].appendChild(button);
    }
}


let button    = document.getElementsByTagName('button');
let letterBtn = document.querySelectorAll('.character');
let numberBtn = document.querySelectorAll('.number');

if(lang ==='en'){change_of_language();}

letterBtn[47].style.width = '250px';
for(let btn of button)
{
    btn.addEventListener('click', () => {
        if(btn.innerHTML      == "Backspace") text.value = text.value.replace(/.$/, "");
        else if(btn.innerHTML == "Enter")     text.value += '\n';
        else if(btn.innerHTML == "Tab")       text.value += '\t';
        else if(btn.innerHTML == "Delete")    text.value = '';
        else if(btn.innerHTML == "Shift" )    shiftElect();
        else if(btn.innerHTML == "Alt"        || 
                btn.innerHTML == "Alt "       || 
                btn.innerHTML == "CapsLock"   || 
                btn.innerHTML == "Win"        || 
                btn.innerHTML == "Ctrl") {}
        else{text.value += btn.innerHTML;}
    });
}

let ShiftLeft  = document.querySelector('.ShiftLeft');
let ShiftRight = document.querySelector('.ShiftRight');
let AltLeft    = document.querySelector('.AltLeft');
let AltRight   = document.querySelector('.AltRight');
var CtrlLeft   = document.querySelector('.ControlLeft');
let CtrlRight  = document.querySelector('.ControlRight');
let Win        = document.querySelector('.Win');
let ArrowUp    = document.querySelector('.ArrowUp');
let ArrowDown  = document.querySelector('.ArrowDown');
let ArrowLeft  = document.querySelector('.ArrowLeft');
let ArrowRight = document.querySelector('.ArrowRight');
let CapsLock   = document.querySelector('.CapsLock');

CapsLock.addEventListener('click', () => {
        CapsLock.classList.toggle('active');
        if(!CapsLock.classList.contains('active'))
        {ToLowerOrUpperButton('lower',true);}
        else{ToLowerOrUpperButton('upper',true);}
});

function shiftElect(){
    ToLowerOrUpperButton('upper');
    setTimeout(() => ToLowerOrUpperButton('lower'), 300);
}

function ToLowerOrUpperButton(type,caps=false){
    if(type == 'upper')
    {
        for(let btn of letterBtn)
        {
            btn.innerHTML = btn.innerHTML.toUpperCase();
        }
        if(!caps)
        {
            for(let i = 0; i < special_characters.length; i++)
            {
                numberBtn[i].innerHTML = special_characters[i];
            }
            letterBtn[25].innerHTML = '/';
            letterBtn[46].innerHTML = ',';
        }

        if(localStorage.getItem('lang') == 'en')
        {
            if(!caps)
            {
                for(let i = 0; i < special_characters_eng.length; i++)
                {
                    numberBtn[i].innerHTML = special_characters_eng[i];
                }
            }
            letterBtn[0].innerHTML  = '~';
            letterBtn[23].innerHTML = '{';
            letterBtn[24].innerHTML = '}';
            letterBtn[25].innerHTML = '|';
            letterBtn[35].innerHTML = ':';
            letterBtn[36].innerHTML = '"';
            letterBtn[44].innerHTML = '<';
            letterBtn[45].innerHTML = '>';
            letterBtn[46].innerHTML = '?';
        }
    }
    else
    {
        let i = 1;
        for(let btn of letterBtn)
        {
            btn.innerHTML = btn.innerHTML.toLowerCase();
        }
        for(let btn of numberBtn)
        {
            if(i == 10){i = 0;btn.innerHTML = i.toString();break}
            btn.innerHTML = i.toString();
            i++;
        }
        numberBtn[10].innerHTML = '-';
        numberBtn[11].innerHTML = '=';
        letterBtn[25].innerHTML = '\\';
        letterBtn[46].innerHTML = '.';

        if(localStorage.getItem('lang') == 'en')
        {
            letterBtn[0].innerHTML  = '`';
            letterBtn[2].innerHTML  = '2';
            letterBtn[23].innerHTML = '[';
            letterBtn[24].innerHTML = ']';
            letterBtn[25].innerHTML = '\\';
            letterBtn[35].innerHTML = ';';
            letterBtn[36].innerHTML = "'";
            letterBtn[44].innerHTML = ',';
            letterBtn[45].innerHTML = '.';
            letterBtn[46].innerHTML = '/';
        }
    }
    
}
function change_of_language()
{
    if(localStorage.getItem('lang') == 'en')
    {
        let count = 0;
        for(let i = 0; i < letterEnglish.length; i++)
        {
            for(let j = 0; j < letterEnglish[i].length; j++)
            {
                button[count].innerHTML = letterEnglish[i][j];
                count++;
            }
        }  
        localStorage.setItem('lang','en');
    }
    else
    { 
        let count = 0;
        for(let i = 0; i < letter.length; i++)
        {
            for(let j = 0; j < letter[i].length; j++)
            {
                button[count].innerHTML = letter[i][j];
                count++;
            }
        }  
        localStorage.setItem('lang','ru');  
    }
}

document.onkeydown = event => {
    text.focus();
    
    if(localStorage.getItem('lang') == 'ru')
    {
        if(event.ctrlKey && event.shiftKey)
        {   
            let count = 0;
            for(let i = 0; i < letterEnglish.length; i++)
            {
               for(let j = 0; j < letterEnglish[i].length; j++)
               {
                    button[count].innerHTML = letterEnglish[i][j];
                    count++;
               }
            }  
            localStorage.setItem('lang','en');
        }
    }
    else
    {
        if(event.ctrlKey && event.shiftKey)
        {   
            let count = 0;
            for(let i = 0; i < letter.length; i++)
            {
               for(let j = 0; j < letter[i].length; j++)
               {
                    button[count].innerHTML = letter[i][j];
                    count++;
               }
            }  
            localStorage.setItem('lang','ru');
        }
    }
    
    for(let btn of button)
    {
        if(event.code == 'ShiftLeft')
        {
            if(CapsLock.classList.contains('active'))
            {
                ToLowerOrUpperButton('lower');
                ShiftLeft.classList.add('active'); 
            }
            else
            {
                ToLowerOrUpperButton('upper');
                ShiftLeft.classList.add('active'); 
            } 
        }
        if(event.code == 'ShiftRight')
        {
            if(CapsLock.classList.contains('active'))
            {
                ToLowerOrUpperButton('lower');
                ShiftRight.classList.add('active'); 
            }
            else
            {
                ToLowerOrUpperButton('upper');
                ShiftRight.classList.add('active'); 
            } 
        }
        if(event.code == 'AltLeft')      AltLeft.classList.add('active');
        if(event.code == 'AltRight')     AltRight.classList.add('active');
        if(event.code == 'ControlLeft')  CtrlLeft.classList.add('active');
        if(event.code == 'ControlRight') CtrlRight.classList.add('active');
        if(event.key  == 'Meta')         Win.classList.add('active');
        if(event.key  == 'ArrowUp')      ArrowUp.classList.add('active');
        if(event.key  == 'ArrowDown')    ArrowDown.classList.add('active');
        if(event.key  == 'ArrowLeft')    ArrowLeft.classList.add('active');
        if(event.key  == 'ArrowRight')   ArrowRight.classList.add('active');
        if(event.key  == 'CapsLock')
        {
            CapsLock.classList.toggle('active');
            if(!CapsLock.classList.contains('active'))
            {ToLowerOrUpperButton('lower',true);}
            else{ToLowerOrUpperButton('upper',true);}
            break;
        }
       
        if(event.key  == btn.innerHTML)
        {
           if (event.key != 'Shift') {btn.classList.add('active');}
        }  
    }
}

document.onkeyup = event => {
    for(let btn of button){
        if(event.key == btn.innerHTML)
        {
            if(event.key != 'CapsLock'){ btn.classList.remove('active');}
        }

        else if(CtrlLeft.classList.contains('active') || CtrlRight.classList.contains('active'))
        {
                btn.classList.remove('active');  
        }

        else if(AltRight.classList.contains('active')) btn.classList.remove('active');
        else if(Win.classList.contains('active'))      btn.classList.remove('active');

        else if(event.keyCode == 16)
        {
            if(!CapsLock.classList.contains('active'))
            {
                ToLowerOrUpperButton('lower');
                btn.classList.remove('active'); 
                if(ShiftLeft.classList.contains('active') || ShiftRight.classList.contains('active') )
                {
                    ShiftLeft.classList.remove('active');
                    ShiftRight.classList.remove('active');
                }
                break;
            }
            else
            {
                ToLowerOrUpperButton('upper');
                btn.classList.remove('active'); 
                if(ShiftLeft.classList.contains('active') || ShiftRight.classList.contains('active') )
                {
                    ShiftLeft.classList.remove('active');
                    ShiftRight.classList.remove('active');
                }
                break;
            }      
        }

        else if(ArrowUp.classList.contains('active')   || 
                ArrowDown.classList.contains('active') ||
                ArrowLeft.classList.contains('active') || 
                ArrowRight.classList.contains('active'))
                {btn.classList.remove('active');}
    }
}