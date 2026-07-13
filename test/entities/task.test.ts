import { describe, expect, test } from 'vitest';

import { RecurrenceFrequency } from '@olegpolyakov/core/objects/recurrence';

import Task from '@/entities/task.ts';

describe('Task', () => {
    describe('constructor', () => {
        test('creates a Task instance with default values', () => {
            const task = new Task({});

            expect(task.title).toBe('');
            expect(task.completed).toBe(false);
            expect(task.dueDate).toBeUndefined();
            expect(task.recurrence).toBeUndefined();
            expect(task.content).toBe('');
            expect(task.priority).toBe(1); // TaskPriority.Medium
            expect(task.tagIds).toEqual([]);
        });
    });

    describe('getNextDueDate', () => {
        test('returns undefined if dueDate is not set', () => {
            const taskWithoutRecurrence = new Task({ dueDate: new Date() });

            expect(taskWithoutRecurrence.getNextDueDate()).toBeUndefined();
        });

        test('returns undefined if recurrence is not set', () => {
            const taskWithoutDueDate = new Task({
                recurrence: {
                    frequency: RecurrenceFrequency.Daily
                }
            });

            expect(taskWithoutDueDate.getNextDueDate()).toBeUndefined();
        });

        test('returns the next due date for daily recurrence', () => {
            const dueDate = new Date('2024-01-01');
            const recurrence = {
                frequency: RecurrenceFrequency.Daily,
                interval: 1
            };
            const task = new Task({ dueDate, recurrence });

            const nextDueDate = task.getNextDueDate();

            expect(nextDueDate).toBeInstanceOf(Date);
            expect(nextDueDate?.getTime()).toBe(dueDate.getTime() + 24 * 60 * 60 * 1000); // Next day
        });

        test('returns the next due date for weekly recurrence', () => {
            const dueDate = new Date('2024-01-01'); // Monday
            const recurrence = {
                frequency: RecurrenceFrequency.Weekly,
                interval: 1,
                values: [0, 2] // Monday and Wednesday
            };
            const task = new Task({ dueDate, recurrence });

            const nextDueDate = task.getNextDueDate();

            expect(nextDueDate).toBeInstanceOf(Date);
            expect(nextDueDate?.getDay()).toBe(2); // Wednesday
        });

        test('returns the next due date for monthly recurrence', () => {
            const dueDate = new Date('2024-01-15');
            const recurrence = {
                frequency: RecurrenceFrequency.Monthly,
                interval: 1,
                values: [15] // 15th of each month
            };
            const task = new Task({ dueDate, recurrence });

            const nextDueDate = task.getNextDueDate();

            expect(nextDueDate).toBeInstanceOf(Date);
            expect(nextDueDate?.getDate()).toBe(15);
            expect(nextDueDate?.getMonth()).toBe(1); // February
        });

        test('returns the next due date for yearly recurrence', () => {
            const dueDate = new Date('2024-01-01');
            const recurrence = {
                frequency: RecurrenceFrequency.Yearly,
                interval: 1,
                values: [0] // January
            };
            const task = new Task({ dueDate, recurrence });

            const nextDueDate = task.getNextDueDate();

            expect(nextDueDate).toBeInstanceOf(Date);
            expect(nextDueDate?.getFullYear()).toBe(2025);
            expect(nextDueDate?.getMonth()).toBe(0); // January
        });
    });
});