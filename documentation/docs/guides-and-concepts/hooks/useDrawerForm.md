---
id: useDrawerForm
title: useDrawerForm
---

import createGif from '@site/static/img/guides-and-concepts/hooks/useDrawerForm/create.gif';
import editGif from '@site/static/img/guides-and-concepts/hooks/useDrawerForm/edit.gif';

The `useDrawerForm` hook allows you manage a form within Drawer. If we look in detail, `useDrawerForm` uses Ant Design [Form](https://ant.design/components/form/) and [Drawer](https://ant.design/components/drawer/) components data scope management under the hood and returns the appropriate values to the components.

All we have to do is pass the props it returns to the `<Drawer>` and `<Form>` components.

For example, let's look at an example of creating a record with `useDrawerForm`.

```tsx title="pages/posts/list.tsx"
import { useDrawerForm, Drawer, Form, Create, Radio } from "@pankod/refine";
import { IPost } from "interfaces";

export const PostList: React.FC () => {

    //highlight-start
    const {
        formProps,
        drawerProps,
        show,
        saveButtonProps,
    } = useDrawerForm<IPost>({
        action: "create",
    });
    //highlight-end

    return (
        <>
            <List
                //highlight-start
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
                //highlight-end
            >
                ...
            </List>
            //highlight-start
            <Drawer {...drawerProps}>
                <Create saveButtonProps={saveButtonProps}>
                    <Form {...formProps} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="published">Published</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Create>
            </Drawer>
            //highlight-end
        </>
    )
}

```

```ts title="interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

<br/>

`createButtonProps` allows creating and managing a button above the table.

```tsx
    createButtonProps={{
        onClick: () => {
            show();
        },
    }}
```

This code block makes `<Drawer>` appear when you click the button.

`saveButtonProps` allows us to manage save button in the drawer.

<div style={{textAlign: "center"}}>
    <img src={createGif} />
</div>

<br />

Let's learn how to add editing capability to records that will be opening form in Drawer with using `action` prop.

```tsx title="pages/posts/list.tsx"
import { useDrawerForm, Drawer, Form, Create, Radio } from "@pankod/refine";
import { IPost } from "../../interfaces";

export const PostList () => {
    const {
        drawerProps,
        formProps,
        show,
        saveButtonProps,
        //highlight-start
        deleteButtonProps,
        editId,
        //highlight-end
    } = useDrawerForm<IPost>({
        //highlight-next-line
        action: "edit",
    });

    return (
        <>
            <List>
                <Table>
                    ...
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_value, record) => (
                            //highlight-start
                            <EditButton
                                size="small"
                                recordItemId={record.id}
                                onClick={() => show(record.id)}
                            />
                            //highlight-end
                        )}
                    />
                </Table>
            </List>
            <Drawer {...drawerProps}>
             //highlight-next-line
                <Edit
                    saveButtonProps={saveButtonProps}
                    //highlight-start
                    deleteButtonProps={deleteButtonProps}
                    recordItemId={editId}
                    //highlight-end
                >
                    <Form {...formProps} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="published">Published</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Edit>
            </Drawer>
        </>
    )
}
```

:::important
refine doesn't automatically add a edit button by default to the each record in `<PostList>` which opens edit form in `<Drawer>` when clicking.

So, we put the edit buttons on our list. In that way, `<Edit>` form in `<Drawer>` can fetch data by record `id`.

```tsx
<Table.Column<IPost>
    title="Actions"
    dataIndex="actions"
    key="actions"
    render={(_value, record) => (
        <EditButton
            size="small"
            recordItemId={record.id}
            onClick={() => show(record.id)}
        />
    )}
/>
```

:::

The `saveButtonProps` and `deleteButtonProps` can provides functionality to save and delete buttons in the drawer.

<div style={{textAlign: "center"}}>
    <img src={editGif} />
</div>

<br />

[Refer to codesandbox example for detailed usage. &#8594](https://www.google.com.tr)