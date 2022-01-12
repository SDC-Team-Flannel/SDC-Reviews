import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import { THEMES } from '../../settings/colors';

//Shared Components
import { Stars, StarForm } from './Stars';
import { Button, Input, Dropdown } from './Form';
import { Modal } from './Modal';

const Components = () => {
  let [modalShowing, setModalShowing] = useState(false);

  return (
    <ThemeProvider theme={THEMES.default}>
      <Section>
        <pre>Star Rating</pre>
        <Stars number={3.56} size={20} />
      </Section>
      <Section>
        <pre>Star Form</pre>
        <StarForm number={3.56} size={120} onClick={(e) => alert(e)} />
      </Section>
      <Section>
        <pre>Modal</pre>
        <Button onClick={() => setModalShowing(true)}>Show Modal +</Button>
        {modalShowing && (
          <Modal size={50} onClose={() => setModalShowing(false)}>
            <h1>Modal!</h1>
          </Modal>
        )}
      </Section>
      <Section>
        <pre>Star Form</pre>
        <Input placeholder='hello' />
        <Dropdown>
          <option value='1'>Option 1</option>
          <option value='2'>Option 2</option>
        </Dropdown>
        <Button>Sample Button</Button>
      </Section>
    </ThemeProvider>
  );
};

const Section = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  pre {
    background-color: #eee;
    padding: 10px;
    border-radius: 2px;
  }
`;

ReactDOM.render(<Components />, document.getElementById('root'));
