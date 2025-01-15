# MockClass

A tiny utility to quickly create Jasmine `SpyObj`s with all methods of a given class prototype spied. It reduces test setup boilerplate in JavaScript/TypeScript projects using Jasmine, regardless of the framework.

## Installation

```bash
npm install mock-class
````

or

```bash
yarn add mock-class
```

## Usage

Instead of manually creating mocks like following:

```typescript
import { UserService } from './user.service';

const mockUserService = {
  addUser: jasmine.createSpy('addUser'),
  removeUser: jasmine.createSpy('removeUser'),
  getUsers: jasmine.createSpy('getUsers'),
  getUserDetails: jasmine.createSpy('getUserDetails'),
};

describe('UserComponent', () => {
  let component: UserComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: mockUserService },
        // ... other providers
      ],
      // ... other config
    });

    component = TestBed.createComponent(UserComponent).componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should call getUsers', () => {
    component.someMethodThatUsesUserService();
    expect(userService.getUsers).toHaveBeenCalled();
  });
});
```

You can use `mock-class` to simplify tests:

```typescript
import { mockClass } from 'mock-class';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: mockClass(UserService) },
        // ... other providers
      ],
      // ... other config
    });

    component = TestBed.createComponent(UserComponent).componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should call getUsers', () => {
    component.someMethodThatUsesUserService();
    expect(userService.getUsers).toHaveBeenCalled();
  });
});
```

`mockClass(UserService)` automatically creates a Jasmine `SpyObj` where all methods of the `UserService`'s prototype (including inherited methods) are spied. This removes the need to manually define each spy.

## How it works

The `mockClass` function iterates through the prototype chain of the provided class, collecting all method names (excluding the constructor). It then uses `jasmine.createSpyObj` to create a spy object with spies for each of these methods.

## TypeScript Support

`mockClass` is fully typed and provides type safety for your mocks. The return type of `mockClass(MyService)` will be `jasmine.SpyObj<MyService>`.

## Contributing

Contributions are welcome\! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

