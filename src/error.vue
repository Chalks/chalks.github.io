<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader />

        <div class="content flex-grow overflow-auto">
            <NuxtLayout>
                <div class="prose container my-12 mx-auto">
                    <h3>Uh Oh, Something Broke</h3>
                    <p>
                        It would help me out a bunch if you let me know what happened. Thanks
                        for taking the time!
                    </p>
                    <ErrorForm require-email />
                </div>
            </NuxtLayout>
        </div>

        <AppFooter />
    </div>
</template>
