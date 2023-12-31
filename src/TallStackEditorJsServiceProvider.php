<?php

namespace TallStackEditorJs;

use Filament\Facades\Filament;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class TallStackEditorJsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('tallstack-editorjs')
            ->hasViews()
            ->hasConfigFile()
            ->hasAssets();
    }

    public function packageBooted()
    {
        if (class_exists(\Filament\FilamentServiceProvider::class)) {
            Filament::serving(function () {
                Filament::registerScripts($this->getScripts(), true);
                Filament::registerStyles($this->getStyles());
            });
        }
    }

    public function getScripts(): array
    {
        return [
            'tallstack-editorjs' => __DIR__ . '/../resources/build/js/editor.js',
        ];
    }

    public function getStyles(): array
    {
        return [
            'tallstack-editorjs' => __DIR__ . '/../resources/build/css/editor.css',
        ];
    }
}