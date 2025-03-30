import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';

import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  try {
    // Create a full NestJS application context
    const app = await NestFactory.createApplicationContext(AppModule, {
      logger: ['error'], // Only log errors
    });

    // Get UsersService directly
    const usersService = app.get(UsersService);
    console.log('UsersService available:', !!usersService);

    // Check if user exists first
    const existingUser = await usersService.findByEmail(email);
    if (existingUser) {
      console.error('User with this email already exists');
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user directly with UsersService
    const user = await usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Output success message
    console.log('User registered successfully:', {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await app.close();
  } catch (error) {
    console.error('Failed to register user:', error.message);
    console.error(error.stack);
    process.exit(1); // Exit with error code
  }
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length !== 4) {
  console.log(
    'Usage: npm run register-user <email> <password> <firstName> <lastName>',
  );
  process.exit(1);
}

const [email, password, firstName, lastName] = args;
registerUser(email, password, firstName, lastName);
