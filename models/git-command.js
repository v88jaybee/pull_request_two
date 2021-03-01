class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    // status(){}
    status(){        
        /*
            For assignment #1:
            Create logic here and run unit testing.
        */
        let object_key_count = Object.keys(this.working_directory.new_changes).length

        if(object_key_count > 0){
            let new_files = '';

            for(let object_idx in this.working_directory.new_changes){
                new_files += '\n'+object_idx 
            }

            return 'You have '+object_key_count+' change/s.' + new_files
        }
        else{
            return 'You have 0 change/s.\n';
        }
      
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        /*
            Create logic here and run unit testing.
        */
        else if(path_file === "*"){
            if(Object.keys(modified_files).length > 0){
                for(let path_file of Object.keys(modified_files)) {
                    if(path_file[0] !== "."){
                        this.staging.push(path_file);
                        delete modified_files[path_file];
                    }
                }
            }
            else{
                return `There is no file changes.`;
            }
        }  
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;