import React from 'react';
import styled from 'styled-components';

function UploadForm() {
    return (
        <div>
            <form>
                <input type="file" multiple="multiple"/>
            </form>
        </div>
    )
}

export default UploadForm;