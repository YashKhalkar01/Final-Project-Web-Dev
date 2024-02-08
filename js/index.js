let addBtn = document.querySelector(".addBtn");
let element = document.querySelector(".todoInputPage");
let cancel = document.querySelector(".cancel");
// console.log(addBtn)
cancel.addEventListener("click", () => {
  window.location.replace("/index.html");
});

function printData() {
  let dta = localStorage.getItem("data");
  let dtalist = document.querySelector(".todoList");

  dta = JSON.parse(dta);

  let list = dta.map((value) => {
    let color = "";
    let no = "";
    if (value.prior === "high") {
      color = "#EA3D2F";
      no = "!!!";
    }
    if (value.prior === "medium") {
      color = "#367BF5";
      no = "!!";
    }
    if (value.prior === "low") {
      color = "#2FA84F";
      no = "!";
    }
    return `<div class="alignData">
    <div class="text">
          <div class="get">
          <div class="header">${value.name}</div>
          <button disabled="disabled"
          style="background-color: ${color}; color: white; font-size: 1rem; border-radius: 15px; width: 2rem; border:0; margin-left: 2rem;">${no}</button>
          </div>
          <div class="para">${value.desc}</div>
          </div>
          <div class="delete"><button class="deleteFont" data-id="${value.id}"><i class="fa fa-trash"aria-hidden="true"></i></button>
          </div>
          </div>`;
  });
  dtalist.innerHTML = list.join("");
  removeTodo();
}

printData();
addBtn.addEventListener("click", () => {
  element.style.visibility = "visible";
});

let save = document.querySelector(".save");
console.log(save);
save.addEventListener("click", () => {
  let nameT = document.querySelector("#nameT");
  let descriptionT = document.querySelector("#descriptionT");
  let priorityS = document.querySelector("#priorityS");
  // console.log(save)
  // console.log(nameT)
  // console.log(descriptionT)
  // console.log(priorityS)
  if (
    nameT.value === "" ||
    descriptionT.value === "" ||
    priorityS.value === ""
  ) {
    Toastify({
      text: "This is a toast",

      duration: 3000,
    }).showToast();
    window.location.assign("/index.html");
  }
  let newData = {
    name: nameT.value,
    desc: descriptionT.value,
    prior: priorityS.value,
    id: Date.now(),
  };
  //   console.log("Hello");
  //   console.log(data);
  //   console.log(newData);
  //   data.push(newData);
  //   console.log(data);
  //   let Tododata = localStorage.getItem("data");
  //   Tododata = Tododata === null ? [] : JSON.parse(Tododata);
  //   console.log(Tododata);
  // //   Tododata.push(newData);
  // Tododata = data.map((value,index),()=>{

  // })
  //   localStorage.setItem('data',Tododata)
  //   console.log(Tododata);
  //   console.log("This" + Tododata);
  //   //   document.write(Tododata);
  //   element.style.visibility = "hidden";
  //   nameT.value = descriptionT.value = priorityS.value = "";
  //   console.log(element);
  let data = localStorage.getItem("data");
  data = data === null ? [] : JSON.parse(data);
  data.push(newData);
  localStorage.setItem("data", JSON.stringify(data));
  nameT.value = descriptionT.value = priorityS.value = "";
  let a = data.length;
  console.log(a);
  let element = document.querySelector(".todoInputPage");
  element.style.visibility = "hidden";
});

function removeTodo() {
  let removeTodoList = document.querySelectorAll(".deleteFont");
  removeTodoList.forEach((button) => {
    button.addEventListener("click", () => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your todo activity has been deleted.",
              icon: "success",
            });
            let id = button.dataset.id;
            // console.log(id);
            let data1 = JSON.parse(localStorage.getItem("data"));
            data1 = data1.filter((value) => {
              return value.id != id;
            });
            localStorage.setItem("data", JSON.stringify(data1));
            printData();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your todo activity is safe :)",
              icon: "error",
            });
          }
        });
    });
  });
}

// let deleteFont = document.querySelectorAll("#deleteFont");
// deleteFont.forEach(button, () => {
//   button.addEventListener("click", () => {});
// });
