const letter = [
    ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
    ['Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','Delete'],
    ['CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter'],
    ['Shift','я','ч','с','м','и','т','ь','б','ю',',','⬆','Shift'],
    ['Ctrl','Win','Alt',' ','Alt ','⬅','⬇','➡','Ctrl']
]

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
            {button.classList.add('key');}

        button.classList.add('btn');
        row[i].appendChild(button);
    }
}

let button = document.getElementsByTagName('button');
for(let btn of button)
{
    btn.addEventListener('click', () => {
        if(btn.innerHTML      == "Backspace") {text.value = text.value.replace(/.$/, "");}
        else if(btn.innerHTML == "Enter")     {text.value += '\n';}
        else if(btn.innerHTML == "Tab")       {text.value += '\t';}
        else if(btn.innerHTML == "Delete")    {text.value = '';}
        else if(btn.innerHTML == "Shift" )    {}
        else if(btn.innerHTML == "Alt"        || 
                btn.innerHTML == "Alt "       || 
                btn.innerHTML == "CapsLock"   || 
                btn.innerHTML == "Win"        || 
                btn.innerHTML == "Ctrl") {}
        else{text.value += btn.innerHTML;}
    });
}