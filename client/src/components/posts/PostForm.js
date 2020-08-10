import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import CKEditor from 'ckeditor4-react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';

const PostForm = ({ close, addPost }) => {
  const onFinish = (values) => {
    let data = [];
    values.texts.map((e) => {
      data.push({
        title: e.title,
        text: e.text.editor.getData()
      });
    });
    addPost({ text: data });
    generatePDF(data);
    close();
  };

  const generatePDF = (data) => {
    var doc = new jsPDF('p', 'pt');
    doc.setFont('helvetica');
    doc.setFontType('normal');
    data.map((e) => {
      doc.text(20, 60, e.title);
      doc.text(20, 80, e.text);
    });
    window.open(doc.output('bloburl', `${Date.now()}.pdf`), '_blank');
  };

  return (
    <div className="post-form">
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="texts">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Space key={field.key} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'title']}
                      fieldKey={[field.fieldKey, 'title']}
                      rules={[{ required: true, message: 'Is Requred' }]}
                    >
                      <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'text']}
                      fieldKey={[field.fieldKey, 'text']}
                      rules={[{ required: true, message: 'Is Requred' }]}
                    >
                      <CKEditor />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
