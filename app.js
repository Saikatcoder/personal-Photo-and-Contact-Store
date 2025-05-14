const openContact = () => {
  new Swal({
    html: `
      <div class="p-4 text-white font-sans">
        <h2 class="text-2xl font-semibold mb-4 text-indigo-200">Add New Contact</h2>
        <form class="space-y-4 text-left" onsubmit="createContact(event)">
          <div>
          <label class="block mb-2 text-sm font-medium text-indigo-100">Upload Profile Photo</label>
          
          <div class="w-full bg-white/10 border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-indigo-400 transition">
            <input type="file" id="image" accept="image/*" class="hidden" onchange="previewSelectedImage(event)">
            <label for="image" class="cursor-pointer flex flex-col items-center justify-center text-white/70">
              <i class="ri-upload-cloud-2-line text-3xl mb-2 text-indigo-300"></i>
              <span class="text-sm">Click to upload or drag & drop image</span>
            </label>
          </div>
        </div>
          <div>
            <label class="block mb-1 text-sm text-indigo-100">Full Name</label>
            <input type="text" placeholder="Enter your name" class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400" id="nameinput"/>
          </div>

          <div>
            <label class="block mb-1 text-sm text-indigo-100">Phone Number</label>
            <input type="tel" placeholder="Enter your number" class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400" id="numberInput"/>
          </div>

          <div class="flex justify-end pt-4">
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition">
              Save
              <i class="ri-save-line"></i>
            </button>
          </div>
        </form>
      </div>
    `,
    background: 'rgba(0, 0, 0, 0.6)',
    backdrop: `
      rgba(0, 0, 0, 0.4)
      left top
      no-repeat
    `,
    showConfirmButton: false,
    customClass: {
      popup: 'rounded-xl glass shadow-2xl backdrop-blur-md w-full max-w-md',
    }
  });
};


const openPhoto = () => {
  Swal.fire({
    html: `
      <form class="space-y-4 text-left" onsubmit="creatPhoto(event)">
        <div>
          <label class="block mb-2 text-sm font-medium text-indigo-100">Upload Profile Photo</label>
          
          <div class="w-full bg-white/10 border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-indigo-400 transition">
            <input type="file" id="image" accept="image/*" class="hidden">
            <label for="image" class="cursor-pointer flex flex-col items-center justify-center text-white/70">
              <i class="ri-upload-cloud-2-line text-3xl mb-2 text-indigo-300"></i>
              <span class="text-sm">Click to upload or drag & drop image</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end pt-4">
          <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition">
            Save
            <i class="ri-save-line"></i>
          </button>
        </div>
      </form>
    `,
    background: 'rgba(0, 0, 0, 0.6)',
    backdrop: `rgba(0, 0, 0, 0.4) left top no-repeat`,
    showConfirmButton: false,
    customClass: {
      popup: 'rounded-xl glass shadow-2xl backdrop-blur-md w-full max-w-md',
    },
  });
};



const createContact = (e) => {
  e.preventDefault();

  const imageInput = document.getElementById('image').files[0];
  const nameInput = document.getElementById('nameinput').value;
  const numberInput = document.getElementById("numberInput").value;
  const fileReader = new FileReader()
  fileReader.readAsDataURL(imageInput)
  fileReader.onload  = (e)=>{
   const contactimage = e.target.result
    const payload = JSON.stringify({
        contactimage,
        numberInput,
        nameInput,
        created:new Date(),
        secretKey: "saikat123"
    })
  const data =CryptoJS.AES.encrypt(payload,"saikat123").toString();
  const key = Date.now()
   localStorage.setItem(key,data)
    new Swal({
  icon: "success",
  title: "Contact Saved!",
  background: 'rgba(0, 0, 0, 0.6)',
  backdrop: `
    rgba(0, 0, 0, 0.4)
    left top
    no-repeat
  `,
  customClass: {
    popup: 'rounded-xl glass shadow-2xl backdrop-blur-md w-full max-w-md text-white font-sans text-center',
    title: 'text-2xl font-semibold text-indigo-200',
    icon: 'text-green-400',
  },
  showConfirmButton: false,
  timer: 1500
});
  }
};



const creatPhoto = (e)=>{
    e.preventDefault();
    const imageInput = document.getElementById("image").files[0];
    const fileReader = new FileReader()
    fileReader.readAsDataURL(imageInput)
    fileReader.onload = (e)=>{
        const image = e.target.result
        const payload = JSON.stringify({
            image,
            created:new Date(),
            secretKey: "saikat123"
        })
      const data =CryptoJS.AES.encrypt(payload,"saikat123").toString();
      const key =  Date.now()
      localStorage.setItem(key, data)
       new Swal({
            icon: "success",
            title: "Contact Saved!",
             background: 'rgba(0, 0, 0, 0.6)',
             backdrop: `
                rgba(0, 0, 0, 0.4)
                left top
                 no-repeat
                 `,
            customClass: {
             popup: 'rounded-xl glass shadow-2xl backdrop-blur-md w-full max-w-md text-white font-sans text-center',
            title: 'text-2xl font-semibold text-indigo-200',
            icon: 'text-green-400',
        },
  showConfirmButton: false,
  timer: 1500
});
    }
}


const getId =()=>{
  return Date.now()
}

 const previewImage = document.getElementById("previewImage");

const unlockKey = async (e) => {
  e.preventDefault();
  const secret = document.getElementById("secretKey");
  const secretKey = secret.value.trim()
  const keys =Object.keys(localStorage);
   const contactList = document.getElementById('contactlist');
   const imageList = document.getElementById("imagelist");
  if(keys.length === 0){
    new Swal({
       icon: 'info',
      title: 'photo contact dosenot exist!',
      background: '#1e1e2f',
      color: '#fff'
    })
  }
   let snNumber = 1;
   let hasPhoto = false;
   let hasContact  =false;
   const id = getId()
   contactList.innerHTML ="";
   imageList.innerHTML  = "";
 for (let key of keys) {
  const decryptData = localStorage.getItem(key);
  const decryptString = await CryptoJS.AES.decrypt(decryptData, secretKey);
  const originaldata = await decryptString.toString(CryptoJS.enc.Utf8);

  if (!originaldata) {
    continue; // skip invalid keys
  }

  try {
    const data = await JSON.parse(originaldata);
    if(data.contactimage && data.nameInput && data.created && data.numberInput){
      hasContact = true;
    const ui = `<tr id=${id}>
      <td class="py-3 px-2">${snNumber}</td>
      <td class="py-3 px-2">
        <div class="flex items-center gap-3">
          <img src="${data.contactimage}" class="w-12 h-12 rounded-full border-2 border-white object-cover"/>
          <div>
            <div class="font-semibold">${data.nameInput}</div>
            <div class="text-sm text-white/60">${data.numberInput}</div>
          </div>
        </div>
      </td>
      <td class="py-3 px-2">${moment(data.created).format('MMMM Do YYYY, h:mm:ss A')}</td>
      <td class="py-3 px-2 text-center space-x-2">
        <button class="text-red-400 hover:text-red-600"onclick="deleteitem('${id}','${key}')"><i class="ri-delete-bin-line" ></i></button>
      </td>
    </tr>`;
    contactList.innerHTML += ui;
     snNumber += 1;
    }

    if(data.image){
    hasPhoto = true
   const imageui = `
  <div class="relative inline-block m-2 group" id=${id}>
    <img src="${data.image}" alt="Photo" class="w-32 h-32 object-cover rounded border hover:scale-105 transition duration-300 photo-thumb" />
    <button 
      onclick="deleteitem('${key}','${id}')"
      class="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
      title="Delete Photo"
    >
      <i class="ri-close-line"></i>
    </button>
  </div>
`;
    imageList.innerHTML += imageui
  }

  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: 'Invalid Secret Key!',
      text: `Cannot decrypt data with this key.`,
      background: '#1e1e2f',
      color: '#fff'
    });
  }
}
secretKey= "";
};
const deleteitem = (id, e) => {
    const tr = document.getElementById(id);
    tr.remove()
    localStorage.removeItem(e)
};



const  showEncryptedData = ()=>{
    const keys = Object.keys(localStorage)
    for(let key of keys){
      const ui = `
        
      `
    }
}