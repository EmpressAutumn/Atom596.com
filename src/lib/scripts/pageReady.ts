import { writable } from "svelte/store";

let resolveReady: () => void;

export const pageReady = writable<Promise<void>>(createPromise());

function createPromise(): Promise<void> {
    return new Promise<void>((resolve) => {
        resolveReady = resolve;
    });
}

export function signalPageReady() {
    resolveReady();
}

export function resetPageReady() {
    pageReady.set(createPromise());
}
