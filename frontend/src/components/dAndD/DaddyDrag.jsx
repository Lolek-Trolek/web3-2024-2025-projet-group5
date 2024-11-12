import React, { useState } from 'react';
import DragAndDropIn from './DragAndDropIn';
import DragAndDropOut from './DragAndDropOut';

function DaddyDrag () {
    const [files, setFiles] = useState([]);

    const addFile = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    return (
        <div>
            <DragAndDropIn addFile={addFile} />
            <DragAndDropOut files={files} />
        </div>
    );
};

export default DaddyDrag;
