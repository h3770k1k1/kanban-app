rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Reguły dla kolekcji 'users'
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }

    // Reguły dla kolekcji 'boards'
    match /boards/{boardId} {
      // Pozwól na odczyt i zapis, jeśli użytkownik jest właścicielem tablicy
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;

      // Pozwól na tworzenie nowych tablic, jeśli użytkownik jest zalogowany
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }

    // Domyślnie blokuj dostęp do innych kolekcji
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
