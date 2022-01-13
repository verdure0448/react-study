import React from 'react'
import PropTypes from 'prop-types'

const MyComponent = ({name, favoriteNum, children}) => {
    
    return (
        <div>
            안녕하세요, 제 이름은 {name}입니다. <br/>
            children 값은 {children} 입니다. <br/>
            제가 좋아하는 숫자는 {favoriteNum}입니다.
        </div>
    );
};
MyComponent.defaultProps = {
    name: '영희'
}

MyComponent.prototype = {
    name: PropTypes.string,
    favoriteNum: PropTypes.number.isRequired
}

export default MyComponent;
