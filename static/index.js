const maintext = document.getElementById('maintext')
const text = document.getElementById('text')
const textfield = document.getElementById('text-field')
const newchat = document.getElementById('new-chat')
const newchatname = document.getElementById('newchatname')
const topbar = document.getElementById('top')
const togglemenu = document.getElementById('toggle-menu')
const chattitle = document.getElementById('chat-title')

let selectedchat = ''
let selectedchat_name = ''
function RefreshChat() {
    Array.from(textfield.children).forEach(el => {
        if (el.getAttribute('name') && el.getAttribute('name') == 'bubc') {
            el.remove()
        }
    })
    if (!selectedchat || selectedchat == '') return
    chattitle.innerHTML = `This is the beginning of your direct message history on <b>${selectedchat_name}</b> channel.`
    fetch(`/api/getmsgs?chatid=${selectedchat}`).then(async resp => {
        const data = await resp.json()
        data.forEach(el => {
            const wrapper = document.createElement('div')
            wrapper.setAttribute('name','bubc')
            wrapper.className = 'flex flex-col items-end gap-1'
            wrapper.innerHTML = `
                <span class="bg-[#1A1D23] border-2 border-[#2A2E36] rounded-l-2xl rounded-tr-2xl py-2 px-3">${el[0]}</span>
                <span class="text-xs text-[#9CA3AF]">${el[1]}</span>
            `
            textfield.appendChild(wrapper)
        })
    })
}

function RefreshList() {
    Array.from(topbar.children).forEach(el => {
        if (el.getAttribute('name') && el.getAttribute('name') == 'cbtn') {
            el.remove()
        }
    })
    fetch('/api/getchats',{
        method: 'GET',
    }).then(async resp => {
        if (resp.ok) {
            const data = await resp.json()
            data.forEach(element => {
                const div = document.createElement('div')
                div.className = 'flex flex-row w-full gap-1 justify-center items-center'

                const rmbtn = document.createElement('button')
                rmbtn.className = 'min-w-[45px] h-full flex justify-center items-center hover:cursor-pointer p-2 bg-[#0F1115] hover:bg-[#1A1D23] transform-colors duration-200 justify-start rounded-lg border-2 border-[#2A2E36] gap-2'
                rmbtn.setAttribute('name','cbtn')
                rmbtn.setAttribute('chatid', element[1])
                rmbtn.addEventListener('click',e => {
                    acc = confirm(`Deleting chat confirmation: ${element[1]}`)
                    if (acc) {
                        
                    }
                })
                rmbtn.innerHTML= `
                <span class="material-symbols-outlined leading-none">delete</span>
                `

                const width = window.innerWidth
                const chatbtn = document.createElement('button')
                chatbtn.className = 'w-full flex text-start justify-center items-center hover:cursor-pointer py-2 bg-[#0F1115] hover:bg-[#1A1D23] transform-colors duration-200 justify-start px-4 rounded-lg border-2 border-[#2A2E36] gap-2'
                chatbtn.setAttribute('name','cbtn')
                chatbtn.setAttribute('chatid', element[1])
                chatbtn.addEventListener('click',e => {
                    e.preventDefault()

                    if (width < 500) {
                        topbar.classList.toggle('-translate-x-full',!hidden);
                        topbar.classList.toggle('translate-x-0',hidden);
                        hidden = !hidden
                    }

                    selectedchat = element[1]
                    selectedchat_name = element[0]
                    textfield.setAttribute('chatid',element[1])
                    RefreshChat()
                })
                chatbtn.innerHTML= `
                <span class="material-symbols-outlined leading-none max-w-[24px] max-h-[24px]">favorite</span>
                ${element[0]}
                `

                div.appendChild(chatbtn)
                div.appendChild(rmbtn)
                topbar.appendChild(div)
            });
        }
    })
}

newchat.addEventListener('submit',e => {
    e.preventDefault()
    fetch('/api/newchat',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chatid: crypto.randomUUID() +`@${newchatname.value||''}`
        })
    }).then(async resp => {
        if (resp.ok) {
            RefreshList()
        }
    })
})

maintext.addEventListener('submit',async e => {
    e.preventDefault()
    text.focus()

    const time = new Date().toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit" 
    })

    if (!selectedchat || selectedchat == '') return
    fetch('/api/msgsend',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            msg: text.value,
            timestamp: time,
            chatid: selectedchat
        })
    })

    const bubble = document.createElement('div')
    bubble.setAttribute('name','bubc')
    bubble.className = 'flex flex-col text-end items-end gap-1'
    bubble.innerHTML = `
        <span class="bg-[#1A1D23] border-1 border-[#2A2E36] rounded-l-lg rounded-tr-lg py-2 px-3 text-end">${text.value}</span>
        <span class="text-xs text-[#9CA3AF]">${time}</span>
    `
    textfield.appendChild(bubble)
    text.value = ''
})

let hidden = false
togglemenu.addEventListener('click',e => {
    e.preventDefault()
    topbar.classList.toggle('-translate-x-full',!hidden);
    topbar.classList.toggle('translate-x-0',hidden);
    hidden = !hidden
})

window.addEventListener('DOMContentLoaded', RefreshList)