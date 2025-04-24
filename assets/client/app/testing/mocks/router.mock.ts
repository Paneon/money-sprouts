import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

export const mockRouter: Partial<Router> = {
    url: '/accounts/test-name/history',
    navigate: jest.fn().mockResolvedValue(true),
    events: of(),
    navigateByUrl: jest.fn().mockResolvedValue(true),
    getCurrentNavigation: jest.fn().mockReturnValue(null),
    serializeUrl: jest.fn().mockReturnValue(''),
    parseUrl: jest.fn().mockReturnValue({ root: {} }),
    isActive: jest.fn().mockReturnValue(true),
    createUrlTree: jest.fn().mockReturnValue({ root: {} }),
};
