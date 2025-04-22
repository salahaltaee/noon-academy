// التحقق من تسجيل الدخول وتحميل بيانات المستخدم
function checkAuthAndRedirect() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const uid = user.uid;
      firebase.firestore().collection("users").doc(uid).get()
        .then(doc => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData.role === "admin") {
              window.location.href = "dashboard-admin.html";
            } else if (userData.role === "teacher") {
              window.location.href = "dashboard-teacher.html";
            } else {
              alert("نوع الحساب غير معروف.");
            }
          } else {
            alert("لم يتم العثور على بيانات الحساب.");
          }
        });
    }
  });
}

// تسجيل الخروج
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    alert("فشل تسجيل الخروج: " + error.message);
  });
}
