import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { 
    faTrash, 
    faSignOutAlt, 
    faEdit, faSpinner, 
    faPlusCircle 
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
    library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle);
}

export default Icons;