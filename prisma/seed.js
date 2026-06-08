import prisma from '../lib/db.js';
import { hashPassword } from '../lib/auth.js';

async function main() {
  console.log('🚀 Initializing database...');

  try {
    // Create default admin user if doesn't exist
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@example.com' },
    });

    if (!adminExists) {
      const hashedPassword = await hashPassword('admin123');
      const admin = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN',
          status: 'ACTIVE',
        },
      });
      console.log('✅ Admin user created:', admin.email);
    } else {
      console.log('✅ Admin user already exists');
    }

    // Create default categories if they don't exist
    const defaultCategories = [
      { name: 'Nature', description: 'Beautiful nature wallpapers' },
      { name: '4K', description: '4K Ultra HD wallpapers' },
      { name: 'Abstract', description: 'Abstract art wallpapers' },
      { name: 'Technology', description: 'Tech and digital wallpapers' },
      { name: 'Landscape', description: 'Scenic landscape wallpapers' },
    ];

    for (const cat of defaultCategories) {
      const slug = cat.name.toLowerCase().replace(/\s+/g, '-');
      const exists = await prisma.category.findUnique({
        where: { slug },
      });

      if (!exists) {
        await prisma.category.create({
          data: {
            name: cat.name,
            description: cat.description,
            slug,
          },
        });
        console.log(`✅ Category created: ${cat.name}`);
      }
    }

    console.log('✅ Database initialization complete!');
    console.log('\n📋 Admin Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Change these credentials in production!');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
