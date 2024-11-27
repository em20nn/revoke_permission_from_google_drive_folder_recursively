function getFilesRecursive2() {
  findFolders("YOUR FOLDER ID")
  function findFolders(folderId) {
    var folders = DriveApp.getFolderById(folderId).getFolders()
    var files = DriveApp.getFolderById(folderId).getFiles()
    var revoke_from="MAIL ADRESS OF REVOKEE"
    while (folders.hasNext()) {
      var folder = folders.next()
      if (folder.getAccess(revoke_from) == DriveApp.Permission.EDIT) {
        DriveApp.getFolderById(folder.getId()).removeEditor(revoke_from)
        console.log("Permission for folder: " + folder.getName() + " updated")
      }
    }
    while (files.hasNext()) {
      var file = files.next()
      if (file.getAccess(revoke_from) == DriveApp.Permission.EDIT) {
        DriveApp.getFileById(file.getId()).removeEditor(revoke_from)
        console.log("Permission for file: " + file.getName() + " updated")
      }
    }
    var folders = DriveApp.getFolderById(folderId).getFolders()
    while (folders.hasNext()) {
      folder = folders.next()
      console.log("subfolder: " + folder.getName() + " scanning")
      findFolders(folder.getId())
    }
  }
}
