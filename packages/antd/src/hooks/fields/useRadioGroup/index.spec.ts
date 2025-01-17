import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useRadioGroup } from "./";

describe("render hook default options", () => {
    it("should success data without default values", async () => {
        const { result } = renderHook(
            () =>
                useRadioGroup({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { radioGroupProps } = result.current;
        const { options } = radioGroupProps;

        expect(options).toHaveLength(2);

        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("should success data with resource with optionLabel and optionValue", async () => {
        const { result } = renderHook(
            () =>
                useRadioGroup<{ id: string; slug: string }>({
                    resource: "posts",
                    optionLabel: "slug",
                    optionValue: "id",
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { radioGroupProps } = result.current;
        const { options } = radioGroupProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            { label: "ut-ad-et", value: "1" },
            { label: "consequatur-molestiae-rerum", value: "2" },
        ]);
    });

    it("should invoke queryOptions methods successfully", async () => {
        const mockFunc = jest.fn();

        const { result } = renderHook(
            () =>
                useRadioGroup<{ id: string; slug: string }>({
                    resource: "posts",
                    optionLabel: "slug",
                    optionValue: "id",
                    queryOptions: {
                        onSuccess: (data) => {
                            mockFunc();
                        },
                    },
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { radioGroupProps } = result.current;
        const { options } = radioGroupProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            { label: "ut-ad-et", value: "1" },
            { label: "consequatur-molestiae-rerum", value: "2" },
        ]);

        expect(mockFunc).toBeCalled();
    });
});
