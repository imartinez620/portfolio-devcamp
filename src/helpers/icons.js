import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faTrash,
    faSignOutAlt,
    faEdit, faSpinner,
    faPlusCircle,
    faPhone,
    faEnvelope,
    faMapMarkedAlt    
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
    library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle, faPhone,
        faEnvelope,
        faMapMarkedAlt    );
}

export default Icons;